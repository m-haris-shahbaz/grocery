import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView, // Replace FlatList with ScrollView
  TextInput,
  Modal,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import AddressForm, { AddressFormRef } from './AddressForm';
import { Address } from '~/lib/types';
import { useOrderMethod } from '~/lib/states/shipping-method';

// Updated type definition with optional fields for form

export type AddressModalRef = {
  open: () => void;
  close: () => void;
};

type AddressModalProps = {
  onSelectAddress: (address: Address) => void;
  selectedAddressId?: string;
};

// Sample address data
const initialAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    title: 'Home',
    address: '123 Green Street, Al Shawamekh, Abu Dhabi',
    isDefault: true,
    building: 'Villa 45',
  },
  {
    id: '2',
    type: 'work',
    title: 'Work',
    address: '456 Office Tower, Downtown, Abu Dhabi',
    isDefault: false,
    building: 'Office Tower, Floor 12',
  },
  {
    id: '3',
    type: 'other',
    title: "Mom's House",
    address: '789 Family Road, Khalifa City, Abu Dhabi',
    isDefault: false,
    building: 'Villa 78, Block C',
  },
];

const { height } = Dimensions.get('window');

const AddressModal = forwardRef<AddressModalRef, AddressModalProps>(
  ({ onSelectAddress, selectedAddressId = '1' }, ref) => {
    const [visible, setVisible] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState<string>(selectedAddressId);
    const [searchQuery, setSearchQuery] = useState('');

    const slideAnim = useRef(new Animated.Value(height)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const addressFormRef = useRef<AddressFormRef>(null);
    const { setOrderAddress, orderAddress } = useOrderMethod();

    // Add this useEffect to update selectedAddress when selectedAddressId prop changes
    useEffect(() => {
      setSelectedAddress(selectedAddressId);
      setOrderAddress(addresses.find((addr) => addr.id === selectedAddressId) || orderAddress);
    }, [selectedAddressId]);

    useImperativeHandle(ref, () => ({
      open: () => {
        // Ensure selectedAddress is set correctly when opening
        setSelectedAddress(selectedAddressId);
        setSearchQuery(''); // Clear any previous search queries
        setVisible(true);
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      },
      close: () => {
        handleClose();
      },
    }));

    const handleClose = () => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    };

    // Add debug logging for selection events
    const handleSelectAddress = (addressId: string) => {
      console.log('Address selected:', addressId);
      setSelectedAddress(addressId);
      const address = addresses.find((addr) => addr.id === addressId);
      if (address) {
        console.log('Calling onSelectAddress with:', address.title);
        onSelectAddress(address);
        handleClose();
      } else {
        console.warn('Selected address not found in address list');
      }
    };

    const handleAddAddress = () => {
      addressFormRef.current?.open();
    };

    const handleEditAddress = (addressId: string) => {
      const address = addresses.find((addr) => addr.id === addressId);
      if (address) {
        addressFormRef.current?.open(address);
      }
    };

    const handleSaveAddress = (newAddress: Address) => {
      // Check if it's an update or new address
      const existingIndex = addresses.findIndex((addr) => addr.id === newAddress.id);

      if (existingIndex !== -1) {
        // Update existing address
        const updatedAddresses = [...addresses];
        updatedAddresses[existingIndex] = newAddress;

        // If this is marked as default, update other addresses
        if (newAddress.isDefault) {
          updatedAddresses.forEach((addr, idx) => {
            if (idx !== existingIndex) {
              updatedAddresses[idx] = { ...addr, isDefault: false };
            }
          });
        }

        setAddresses(updatedAddresses);
      } else {
        // Add new address
        const updatedAddresses = [...addresses];

        // If new address is default, update others
        if (newAddress.isDefault) {
          updatedAddresses.forEach((addr) => {
            addr.isDefault = false;
          });
        }

        setAddresses([...updatedAddresses, newAddress]);
      }
    };
    const filteredAddresses =
      searchQuery.trim() === ''
        ? addresses
        : addresses.filter(
            (addr) =>
              addr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              addr.address.toLowerCase().includes(searchQuery.toLowerCase())
          );

    const renderAddressIcon = (type: string) => {
      switch (type) {
        case 'home':
          return <Ionicons name="home-outline" size={24} color="#2f6f39" />;
        case 'work':
          return <MaterialIcons name="work-outline" size={24} color="#2f6f39" />;
        default:
          return <Ionicons name="location-outline" size={24} color="#2f6f39" />;
      }
    };

    return (
      <>
        <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
          <View className="flex-1 justify-end p-4">
            <Pressable className="absolute inset-0" onPress={handleClose}>
              <Animated.View
                className="absolute inset-0 bg-black"
                style={{ opacity: backdropOpacity }}
              />
            </Pressable>

            <Animated.View
              className="rounded-t-3xl bg-white"
              style={{
                transform: [{ translateY: slideAnim }],
                maxHeight: '80%', // Add explicit max height
              }}>
              <View className="flex-row items-center justify-between border-b border-gray-100 p-5">
                <Text className="text-xl font-semibold">Select Delivery Address</Text>
                <TouchableOpacity onPress={handleClose}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View className="m-4 flex-row items-center rounded-lg bg-gray-100 px-3">
                <Feather name="search" size={20} color="gray" className="mr-2" />
                <TextInput
                  className="h-11 flex-1 text-base"
                  placeholder="Search for area, street name..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={20} color="gray" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Debug information */}
              {__DEV__ && (
                <View className="px-4">
                  <Text className="text-xs text-gray-500">
                    Found {filteredAddresses.length} addresses
                  </Text>
                </View>
              )}

              {/* Use a View with fixed height to contain scroll content */}
              <View className="border-b border-t border-gray-100" style={{ height: 300 }}>
                {filteredAddresses.length === 0 ? (
                  <View className="items-center justify-center py-6">
                    <Text className="text-gray-500">No addresses found</Text>
                  </View>
                ) : (
                  <ScrollView
                    className="bg-gray-50"
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={true}>
                    {filteredAddresses.map((item) => (
                      <Pressable
                        key={item.id}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
                        className={`mb-3 flex-row items-center rounded-lg border border-gray-200 bg-white p-4 ${
                          selectedAddress === item.id ? 'border-lime-300 bg-lime-50' : ''
                        }`}
                        onPress={() => handleSelectAddress(item.id)}>
                        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-lime-100">
                          {renderAddressIcon(item.type)}
                        </View>
                        <View className="flex-1">
                          <View className="flex-row items-center">
                            <Text className="text-base font-medium">{item.title}</Text>
                            {item.isDefault && (
                              <View className="ml-2 rounded-full bg-lime-100 px-2 py-0.5">
                                <Text className="text-xs font-medium text-lime-700">Default</Text>
                              </View>
                            )}
                          </View>
                          <Text className="text-gray-600">{item.address}</Text>
                          {item.building && (
                            <Text className="text-sm text-gray-500">{item.building}</Text>
                          )}
                        </View>
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            className="mr-2 p-2"
                            onPress={(e) => {
                              e.stopPropagation();
                              handleEditAddress(item.id);
                            }}>
                            <MaterialIcons name="edit" size={20} color="#2f6f39" />
                          </TouchableOpacity>
                          {selectedAddress === item.id ? (
                            <MaterialIcons name="check-circle" size={24} color="#2f6f39" />
                          ) : (
                            <View className="h-6 w-6 rounded-full border border-gray-300" />
                          )}
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                )}
              </View>

              <TouchableOpacity
                className="mx-4 my-4 flex-row items-center justify-center rounded-full bg-primary py-3"
                onPress={handleAddAddress}>
                <MaterialIcons name="add" size={22} color="black" />
                <Text className="ml-2 text-base font-semibold">Add New Address</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

        {/* Form Modal for adding/editing addresses */}
        <AddressForm ref={addressFormRef} onSave={handleSaveAddress} />
      </>
    );
  }
);

export default AddressModal;
