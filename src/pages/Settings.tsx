import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Button from '../components/Button';
import {
    ShieldCheckIcon,
    BellIcon,
    CreditCardIcon,
    BuildingLibraryIcon,
    ArrowsUpDownIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface UtilityProvider {
    id: string;
    name: string;
    accountNumber: string;
    enabled: boolean;
    maxBudget?: number;
    notifyPayment?: boolean;
}

interface PaymentMethod {
    id: string;
    type: 'card' | 'wallet';
    provider: string;
    last4?: string;
    isDefault: boolean;
}

type TabType = 'profile' | 'security' | 'utilities' | 'payment' | 'priority' | 'notifications';

// Sortable Item Component for Priority List
const SortableItem = ({ id, utility }: { id: string, utility: UtilityProvider }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #2A3441',
        backgroundColor: isDragging ? '#1E293B' : '#121826',
        marginBottom: '8px',
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'none',
        zIndex: isDragging ? 1 : 0,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ArrowsUpDownIcon style={{ width: '20px', height: '20px', color: '#00C2FF' }} />
                <div>
                    <h3 style={{ fontWeight: '500', color: '#FFFFFF' }}>{utility.name}</h3>
                    <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                        Account: {utility.accountNumber}
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div>
                    <label style={{ color: '#94A3B8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                        Max Budget
                    </label>
                    <input
                        type="number"
                        defaultValue={utility.maxBudget || 0}
                        style={{
                            backgroundColor: '#1E293B',
                            border: '1px solid #2A3441',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            color: '#FFFFFF',
                            width: '100px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '14px' }}>Enabled</span>
                    <label style={{ position: 'relative', width: '40px', height: '20px' }}>
                        <input
                            type="checkbox"
                            checked={utility.enabled}
                            onChange={(e) => e.stopPropagation()}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: utility.enabled ? '#00C2FF' : '#2A3441',
                            borderRadius: '10px',
                            transition: '0.3s',
                        }}></span>
                    </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '14px' }}>Notify</span>
                    <label style={{ position: 'relative', width: '40px', height: '20px' }}>
                        <input
                            type="checkbox"
                            checked={utility.notifyPayment}
                            onChange={(e) => e.stopPropagation()}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: utility.notifyPayment ? '#00C2FF' : '#2A3441',
                            borderRadius: '10px',
                            transition: '0.3s',
                        }}></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

const Settings = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    const logout = () => {
        setUser(null);
    };
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // const [showAddUtility, setShowAddUtility] = useState(false);
    // const [showAddPayment, setShowAddPayment] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // State for various settings
    const [utilities, setUtilities] = useState<UtilityProvider[]>([
        { id: 'phcn', name: 'PHCN', accountNumber: '1234567890', enabled: true, maxBudget: 15000, notifyPayment: true },
        { id: 'ikedc', name: 'IKEDC', accountNumber: '0987654321', enabled: true, maxBudget: 12000, notifyPayment: false },
        { id: 'dstv', name: 'DStv', accountNumber: '5555555555', enabled: true, maxBudget: 8000, notifyPayment: true },
        { id: 'netflix', name: 'Netflix', accountNumber: '7777777777', enabled: false, maxBudget: 5000, notifyPayment: false },
    ]);

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: '1', type: 'card', provider: 'Visa', last4: '4242', isDefault: true },
        { id: '2', type: 'wallet', provider: 'Opay', isDefault: false },
    ]);

    const [priorityOrder, setPriorityOrder] = useState([
        'phcn',
        'ikedc',
        'dstv',
        'netflix',
    ]);

    const [notifications, setNotifications] = useState({
        billReminders: true,
        paymentAlerts: true,
        lowBalance: true,
        email: true,
        sms: false,
        inApp: true,
    });

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [autoPriority, setAutoPriority] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = priorityOrder.indexOf(active.id as string);
            const newIndex = priorityOrder.indexOf(over.id as string);

            setPriorityOrder(arrayMove(priorityOrder, oldIndex, newIndex));
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // TODO: Implement account deletion API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to delete account:', error);
        }
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // TODO: Implement actual API call to save settings
            console.log('Settings saved:', { priorityOrder, utilities, notifications });
        } catch (error) {
            console.error('Failed to save settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const styles = {
        container: {
            padding: '24px',
            maxWidth: '900px',
            margin: '0 auto',
            color: '#FFFFFF',
        },
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '8px',
        },
        subheader: {
            color: '#94A3B8',
            marginBottom: '24px',
        },
        tabContainer: {
            display: 'flex',
            borderBottom: '1px solid #2A3441',
            marginBottom: '24px',
            overflowX: 'auto' as const,
        },
        tab: {
            padding: '12px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94A3B8',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s',
        },
        activeTab: {
            color: '#00C2FF',
            borderBottom: '2px solid #00C2FF',
        },
        section: {
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
        },
        sectionTitle: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
        },
        grid: {
            display: 'grid',
            gap: '16px',
        },
        toggle: {
            position: 'relative' as const,
            width: '48px',
            height: '24px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
        },
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <UserIcon className="w-5 h-5" />
                            Profile Settings
                        </h2>
                        <Button
                            onClick={() => navigate('/profile')}
                            variant="secondary"
                        >
                            Edit Profile
                        </Button>
                    </div>
                );
            case 'security':
                return (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <ShieldCheckIcon className="w-5 h-5" />
                            Security Settings
                        </h2>
                        <div style={styles.grid}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontWeight: '500' }}>Two-Factor Authentication</h3>
                                    <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                                <label style={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={twoFactorEnabled}
                                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                                    />
                                </label>
                            </div>
                            <Button
                                variant="secondary"
                                onClick={() => {/* TODO: Implement password change */}}
                            >
                                Change Password
                            </Button>
                            <div style={{ marginTop: '24px', borderTop: '1px solid #2A3441', paddingTop: '24px' }}>
                                <h3 style={{ fontWeight: '500', color: '#F87171', marginBottom: '8px' }}>Danger Zone</h3>
                                <Button
                                    variant="danger"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'utilities':
                return (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <BuildingLibraryIcon className="w-5 h-5" />
                            Utilities Management
                        </h2>
                        <div style={styles.grid}>
                            {utilities.map((utility) => (
                                <div
                                    key={utility.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #2A3441',
                                        backgroundColor: '#121826',
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontWeight: '500' }}>{utility.name}</h3>
                                        <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                                            Account: {utility.accountNumber}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <label style={styles.toggle}>
                                            <input
                                                type="checkbox"
                                                checked={utility.enabled}
                                                onChange={() => {
                                                    setUtilities(utilities.map(u =>
                                                        u.id === utility.id
                                                            ? { ...u, enabled: !u.enabled }
                                                            : u
                                                    ));
                                                }}
                                            />
                                        </label>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {/* TODO: Implement edit utility */}}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => {/* TODO: Implement add utility modal */}}
                            >
                                Add Utility
                            </Button>
                        </div>
                    </div>
                );
            case 'payment':
                return (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <CreditCardIcon className="w-5 h-5" />
                            Payment Methods
                        </h2>
                        <div style={styles.grid}>
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #2A3441',
                                        backgroundColor: '#121826',
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontWeight: '500' }}>
                                            {method.provider} {method.type === 'card' ? `•••• ${method.last4}` : 'Wallet'}
                                        </h3>
                                        <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                                            {method.isDefault ? 'Default payment method' : ''}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {!method.isDefault && (
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setPaymentMethods(paymentMethods.map(m => ({
                                                        ...m,
                                                        isDefault: m.id === method.id
                                                    })));
                                                }}
                                            >
                                                Set Default
                                            </Button>
                                        )}
                                        <Button
                                            variant="secondary"
                                            onClick={() => {/* TODO: Implement edit payment method */}}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => {/* TODO: Implement add payment modal */}}
                            >
                                Add Payment Method
                            </Button>
                        </div>
                    </div>
                );
            case 'priority':
                return (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <ArrowsUpDownIcon className="w-5 h-5" />
                            Priority Settings
                        </h2>
                        <div style={styles.grid}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px',
                            }}>
                                <div>
                                    <h3 style={{ fontWeight: '500' }}>Automatic Priority Adjustment</h3>
                                    <p style={{ color: '#94A3B8', fontSize: '14px' }}>
                                        Automatically adjust priorities based on balance
                                    </p>
                                </div>
                                <label style={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={autoPriority}
                                        onChange={(e) => setAutoPriority(e.target.checked)}
                                    />
                                </label>
                            </div>

                            <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '16px' }}>
                                Drag and drop to reorder your payment priorities
                            </p>

                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={priorityOrder}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {priorityOrder.map((id) => {
                                        const utility = utilities.find(u => u.id === id);
                                        if (!utility) return null;
                                        return (
                                            <SortableItem key={id} id={id} utility={utility} />
                                        );
                                    })}
                                </SortableContext>
                            </DndContext>

                            <div style={styles.buttonContainer}>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        // Reset to original order
                                        setPriorityOrder(['phcn', 'ikedc', 'dstv', 'netflix']);
                                    }}
                                >
                                    Reset Order
                                </Button>
                                <Button
                                    loading={isSaving}
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <BellIcon className="w-5 h-5" />
                            Notification Preferences
                        </h2>
                        <div style={styles.grid}>
                            {Object.entries(notifications).map(([key, value]) => (
                                <div
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #2A3441',
                                        backgroundColor: '#121826',
                                    }}
                                >
                                    <span style={{ textTransform: 'capitalize' }}>
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <label style={styles.toggle}>
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={() => {
                                                setNotifications({
                                                    ...notifications,
                                                    [key]: !value,
                                                });
                                            }}
                                        />
                                    </label>
                                </div>
                            ))}
                            <div style={styles.buttonContainer}>
                                <Button
                                    loading={isSaving}
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Settings</h1>
            <p style={styles.subheader}>
                Customize your preferences and manage your account
            </p>

            {/* Tab Navigation */}
            <div style={styles.tabContainer}>
                <div
                    style={{...styles.tab, ...(activeTab === 'profile' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('profile')}
                >
                    <UserIcon style={{ width: '16px', height: '16px' }} />
                    Profile
                </div>
                <div
                    style={{...styles.tab, ...(activeTab === 'security' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('security')}
                >
                    <ShieldCheckIcon style={{ width: '16px', height: '16px' }} />
                    Security
                </div>
                <div
                    style={{...styles.tab, ...(activeTab === 'utilities' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('utilities')}
                >
                    <BuildingLibraryIcon style={{ width: '16px', height: '16px' }} />
                    Utilities
                </div>
                <div
                    style={{...styles.tab, ...(activeTab === 'payment' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('payment')}
                >
                    <CreditCardIcon style={{ width: '16px', height: '16px' }} />
                    Payment
                </div>
                <div
                    style={{...styles.tab, ...(activeTab === 'priority' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('priority')}
                >
                    <ArrowsUpDownIcon style={{ width: '16px', height: '16px' }} />
                    Priority
                </div>
                <div
                    style={{...styles.tab, ...(activeTab === 'notifications' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('notifications')}
                >
                    <BellIcon style={{ width: '16px', height: '16px' }} />
                    Notifications
                </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {/* Delete Account Confirmation Modal */}
            {showDeleteConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 50,
                }}>
                    <div style={{
                        backgroundColor: '#1E293B',
                        borderRadius: '12px',
                        padding: '24px',
                        width: '90%',
                        maxWidth: '500px',
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                            Delete Account
                        </h2>
                        <p style={{ marginBottom: '24px', color: '#94A3B8' }}>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <Button
                                variant="secondary"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;


