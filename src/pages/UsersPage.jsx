import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical,
  Mail,
  Phone,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  RefreshCw,
  Eye,
  Key,
  Download,
  Shield,
  Briefcase,
  User,
  DollarSign,
  Wifi,
  WifiOff
} from 'lucide-react';
import { 
  Table, 
  Button, 
  Input, 
  Tag, 
  Avatar, 
  Dropdown, 
  Card, 
  Statistic,
  Modal,
  Form,
  Select,
  message,
  Badge,
  Tooltip
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Option } = Select;

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    role_code: undefined,
    status_code: undefined,
    search: '',
  });
  const [filterOptions, setFilterOptions] = useState({
    roles: [],
    statuses: []
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // API Base URL - FIXED
  const API_BASE = 'http://localhost:3000/api';
  const token = localStorage.getItem('access_token');

  // Axios instance with auth - FIXED interceptors
  const api = axios.create({
    baseURL: API_BASE,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Add request/response interceptors
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        message.error('Session expired. Please login again.');
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  // Fetch filter options - FIXED endpoint
  const fetchFilterOptions = async () => {
    try {
      const response = await api.get('/users/filters');
      if (response.data.success) {
        setFilterOptions({
          roles: response.data.data.roles || [],
          statuses: response.data.data.statuses || []
        });
      }
    } catch (error) {
      console.error('Error fetching filters:', error);
      message.error('Failed to load filter options');
    }
  };

  // Fetch users - FIXED endpoint and params
  const fetchUsers = async (page = 1, pageSize = 10, currentFilters = {}) => {
    setLoading(true);
    try {
      // Prepare query params
      const params = {
        page,
        limit: pageSize,
        ...currentFilters
      };
      
      // Remove undefined/null values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          delete params[key];
        }
      });

      console.log('Fetching users with params:', params);
      
      const response = await api.get('/users', { params });
      
      if (response.data.success) {
        setUsers(response.data.data.users || []);
        setPagination({
          current: response.data.data.pagination?.page || 1,
          pageSize: response.data.data.pagination?.limit || pageSize,
          total: response.data.data.pagination?.total || 0,
        });
      } else {
        message.error(response.data.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 403) {
        message.error('You do not have permission to view users');
      } else {
        message.error(error.response?.data?.message || 'Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  // Create user - FIXED endpoint
  const createUser = async (values) => {
    setActionLoading(true);
    try {
      const response = await api.post('/users', values);
      if (response.data.success) {
        message.success('User created successfully');
        setModalVisible(false);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      message.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setActionLoading(false);
    }
  };

  // Update user - FIXED endpoint
  const updateUser = async (userId, values) => {
    setActionLoading(true);
    try {
      const response = await api.put(`/users/${userId}`, values);
      if (response.data.success) {
        message.success('User updated successfully');
        setModalVisible(false);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete user - FIXED endpoint
  const deleteUser = async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      if (response.data.success) {
        message.success('User deleted successfully');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  // Activate/Deactivate user - FIXED endpoint
  const toggleUserStatus = async (userId, activate = true) => {
    try {
      const endpoint = activate ? 'activate' : 'deactivate';
      const response = await api.patch(`/users/${userId}/${endpoint}`);
      
      if (response.data.success) {
        message.success(`User ${activate ? 'activated' : 'deactivated'} successfully`);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      message.error(error.response?.data?.message || 'Failed to change user status');
    }
  };

  // Initialize
  useEffect(() => {
    console.log('Token:', token ? 'Present' : 'Missing');
    fetchFilterOptions();
    fetchUsers();
  }, []);

  // Handle table change
  const handleTableChange = (newPagination, filterValues, sorter) => {
    const newFilters = {
      ...filters,
      role_code: filterValues.role?.[0],
      status_code: filterValues.status?.[0]
    };
    setFilters(newFilters);
    fetchUsers(newPagination.current, newPagination.pageSize, newFilters);
  };

  // Handle search
  const handleSearch = (value) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchUsers(1, pagination.pageSize, newFilters);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    fetchUsers(1, pagination.pageSize, newFilters);
  };

  // Export users
  const exportUsers = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `users_${dayjs().format('YYYY-MM-DD')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    message.success('Users exported successfully');
  };

  // Role icon mapping
  const getRoleIcon = (roleCode) => {
    switch(roleCode) {
      case 'SA': return <Shield className="w-3 h-3" />;
      case 'AD': return <Shield className="w-3 h-3" />;
      case 'MN': return <Briefcase className="w-3 h-3" />;
      case 'HR': return <User className="w-3 h-3" />;
      case 'AC': return <DollarSign className="w-3 h-3" />;
      case 'SE': return <Wifi className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  // Status color mapping
  const getStatusColor = (statusCode) => {
    switch(statusCode) {
      case 'ACT': return 'green';
      case 'DEA': return 'red';
      case 'BAN': return 'orange';
      default: return 'default';
    }
  };

  // Status text mapping
  const getStatusText = (statusCode) => {
    switch(statusCode) {
      case 'ACT': return 'Active';
      case 'DEA': return 'Deactivated';
      case 'BAN': return 'Banned';
      default: return statusCode;
    }
  };

  // Columns definition - FIXED data mapping
  const columns = [
    {
      title: 'User',
      dataIndex: 'user_name',
      key: 'user',
      width: 200,
      render: (userName, record) => (
        <div className="flex items-center">
          <Avatar 
            size="small"
            className="bg-gradient-to-r from-blue-500 to-purple-500 mr-3"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.first_name + ' ' + record.last_name)}&background=3b82f6&color=fff`}
          >
            {record.first_name?.charAt(0)}{record.last_name?.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{record.first_name} {record.last_name}</div>
            <div className="text-xs text-gray-500">@{userName}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'contact',
      render: (email, record) => (
        <div className="space-y-1">
          <div className="flex items-center text-gray-600">
            <Mail className="w-3 h-3 mr-2" />
            <span className="text-sm">{email}</span>
          </div>
          {record.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-3 h-3 mr-2" />
              <span className="text-sm">{record.phone}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role_code',
      key: 'role',
      filters: filterOptions.roles.map(role => ({
        text: role.role_name,
        value: role.role_code,
      })),
      render: (roleCode, record) => (
        <Tag 
          icon={getRoleIcon(roleCode)}
          color={
            roleCode === 'SA' || roleCode === 'AD' ? 'red' :
            roleCode === 'MN' ? 'blue' :
            roleCode === 'SE' ? 'green' :
            roleCode === 'HR' ? 'purple' :
            roleCode === 'AC' ? 'gold' : 'default'
          }
        >
          {record.role_name}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status_code',
      key: 'status',
      filters: filterOptions.statuses.map(status => ({
        text: status.status_name,
        value: status.status_code,
      })),
      render: (statusCode, record) => (
        <Badge 
          status={statusCode === 'ACT' ? 'success' : 'error'}
          text={getStatusText(statusCode)}
        />
      ),
    },
    {
      title: 'Registered',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => (
        <Tooltip title={dayjs(date).format('DD MMM YYYY, hh:mm A')}>
          <span className="text-gray-600 text-sm">
            {dayjs(date).fromNow()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                label: (
                  <div className="flex items-center px-2 py-1">
                    <Eye className="w-3 h-3 mr-2" />
                    View Details
                  </div>
                ),
                onClick: () => setSelectedUser(record),
              },
              {
                key: 'edit',
                label: (
                  <div className="flex items-center px-2 py-1">
                    <Edit className="w-3 h-3 mr-2" />
                    Edit User
                  </div>
                ),
                onClick: () => {
                  setSelectedUser(record);
                  setModalVisible(true);
                },
              },
              record.status_code === 'ACT' ? {
                key: 'deactivate',
                label: (
                  <div className="flex items-center px-2 py-1 text-orange-600">
                    <UserX className="w-3 h-3 mr-2" />
                    Deactivate
                  </div>
                ),
                onClick: () => toggleUserStatus(record.user_id, false),
              } : {
                key: 'activate',
                label: (
                  <div className="flex items-center px-2 py-1 text-green-600">
                    <UserCheck className="w-3 h-3 mr-2" />
                    Activate
                  </div>
                ),
                onClick: () => toggleUserStatus(record.user_id, true),
              },
              {
                key: 'delete',
                label: (
                  <div className="flex items-center px-2 py-1 text-red-600">
                    <Trash2 className="w-3 h-3 mr-2" />
                    Delete User
                  </div>
                ),
                onClick: () => {
                  Modal.confirm({
                    title: 'Delete User',
                    content: 'Are you sure you want to delete this user?',
                    okText: 'Delete',
                    okType: 'danger',
                    onOk: () => deleteUser(record.user_id),
                  });
                },
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </Dropdown>
      ),
    },
  ];

  // Stats calculation
  const stats = {
    total: pagination.total,
    active: users.filter(u => u.status_code === 'ACT').length,
    inactive: users.filter(u => u.status_code === 'DEA').length,
    newThisMonth: users.filter(u => 
      dayjs(u.created_at).isAfter(dayjs().subtract(1, 'month'))
    ).length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all system users and permissions</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => fetchUsers()}
            loading={loading}
          >
            Refresh
          </Button>
          <Button 
            type="primary" 
            icon={<UserPlus className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setSelectedUser(null);
              setModalVisible(true);
            }}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Statistic
            title="Total Users"
            value={stats.total}
            prefix={<Users className="w-4 h-4 mr-2" />}
            styles={{ content: { color: '#3b82f6' } }}
          />
        </Card>
        <Card>
          <Statistic
            title="Active Users"
            value={stats.active}
            prefix={<Wifi className="w-4 h-4 mr-2 text-green-500" />}
            styles={{ content: { color: '#10b981' } }}
          />
        </Card>
        <Card>
          <Statistic
            title="Inactive Users"
            value={stats.inactive}
            prefix={<WifiOff className="w-4 h-4 mr-2 text-red-500" />}
            styles={{ content: { color: '#ef4444' } }}
          />
        </Card>
        <Card>
          <Statistic
            title="New This Month"
            value={stats.newThisMonth}
            styles={{ content: { color: '#8b5cf6' } }}
          />
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                allowClear
              />
            </div>
            
            <Select
              placeholder="Filter by Role"
              className="w-full md:w-40"
              value={filters.role_code}
              onChange={(value) => handleFilterChange('role_code', value)}
              allowClear
            >
              {filterOptions.roles.map(role => (
                <Option key={role.role_code} value={role.role_code}>
                  {role.role_name}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Filter by Status"
              className="w-full md:w-40"
              value={filters.status_code}
              onChange={(value) => handleFilterChange('status_code', value)}
              allowClear
            >
              {filterOptions.statuses.map(status => (
                <Option key={status.status_code} value={status.status_code}>
                  {status.status_name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button 
              icon={<Download className="w-4 h-4" />}
              onClick={exportUsers}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} users`,
          }}
          onChange={handleTableChange}
          rowClassName="hover:bg-gray-50 transition-colors"
          rowKey="user_id"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Add/Edit User Modal */}
      <Modal
        title={selectedUser ? 'Edit User' : 'Add New User'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          onFinish={selectedUser ? 
            (values) => updateUser(selectedUser.user_id, values) :
            (values) => createUser(values)
          }
          initialValues={selectedUser || {}}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="user_name"
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter valid email' }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            {!selectedUser && (
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter password' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            )}

            <Form.Item
              label="Role"
              name="role_code"
              rules={[{ required: true, message: 'Please select role' }]}
            >
              <Select placeholder="Select role">
                {filterOptions.roles
                  .filter(role => role.role_code !== 'SA') // Don't allow creating SA users
                  .map(role => (
                    <Option key={role.role_code} value={role.role_code}>
                      {role.role_name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Status"
              name="status_code"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                {filterOptions.statuses.map(status => (
                  <Option key={status.status_code} value={status.status_code}>
                    {status.status_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={actionLoading}
              >
                {selectedUser ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Details Modal */}
      <Modal
        title="User Details"
        open={!!selectedUser}
        onCancel={() => setSelectedUser(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedUser(null)}>
            Close
          </Button>
        ]}
        width={500}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar 
                size={64}
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.first_name + ' ' + selectedUser.last_name)}&background=3b82f6&color=fff`}
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedUser.first_name} {selectedUser.last_name}
                </h3>
                <p className="text-gray-600">@{selectedUser.user_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Role</label>
                <Tag color="blue">{selectedUser.role_name}</Tag>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <Tag color={getStatusColor(selectedUser.status_code)}>
                  {getStatusText(selectedUser.status_code)}
                </Tag>
              </div>
              <div>
                <label className="text-sm text-gray-500">Registered</label>
                <p className="font-medium">
                  {dayjs(selectedUser.created_at).format('DD MMM YYYY')}
                </p>
              </div>
            </div>

            {selectedUser.address && (
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium">
                  {selectedUser.address.area}, {selectedUser.address.city}<br />
                  {selectedUser.address.state} - {selectedUser.address.pincode}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersPage;