import React from 'react';

const SimpleNotificationPopup = ({ 
  isOpen, 
  onClose, 
  notifications = [], 
  onMarkAsRead, 
  onMarkAllAsRead 
}) => {
  if (!isOpen) {
    return null;
  }

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type, priority) => {
    switch (type) {
      case 'deadline':
        return priority === 'high' ? '⚠️' : '⏰';
      case 'deadline_passed':
        return '🚨';
      case 'application':
        return '📝';
      case 'job':
        return '💼';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type, priority) => {
    switch (type) {
      case 'deadline':
        return priority === 'high' ? '#ef4444' : '#f59e0b';
      case 'deadline_passed':
        return '#dc2626';
      case 'application':
        return '#3b82f6';
      case 'job':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '400px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>
            Notifications
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Notifications List */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => {
              const icon = getNotificationIcon(notification.type, notification.priority);
              const color = getNotificationColor(notification.type, notification.priority);
              
              return (
                <div
                  key={notification.id}
                  onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    backgroundColor: notification.read ? 'white' : '#f8fafc',
                    borderLeft: notification.read ? 'none' : `4px solid ${color}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                      <div style={{ 
                        fontSize: '20px', 
                        marginRight: '12px',
                        marginTop: '2px'
                      }}>
                        {icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: notification.read ? '400' : '600',
                          color: notification.read ? '#374151' : '#111827',
                          marginBottom: '4px',
                          fontSize: '15px'
                        }}>
                          {notification.title}
                        </div>
                        <div style={{ 
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {notification.message}
                        </div>
                        <div style={{ 
                          fontSize: '12px',
                          color: '#9ca3af',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span>{formatTime(notification.timestamp)}</span>
                          {notification.priority === 'high' && (
                            <span style={{
                              backgroundColor: '#fef2f2',
                              color: '#dc2626',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '500'
                            }}>
                              URGENT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {!notification.read && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: color,
                        borderRadius: '50%',
                        marginLeft: '8px',
                        flexShrink: 0
                      }} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div style={{
            padding: '12px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            textAlign: 'center'
          }}>
            <button
              onClick={onMarkAllAsRead}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleNotificationPopup;
