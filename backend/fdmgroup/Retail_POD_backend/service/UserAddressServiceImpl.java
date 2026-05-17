package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.DeliveryAddress;
import com.fdmgroup.Retail_POD_backend.model.DTO.DeliveryAddressDTO;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.mapper.DeliveryAddressMapper;
import com.fdmgroup.Retail_POD_backend.repository.DeliveryAddressRepository;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserAddressServiceImpl implements UserAddressService {

    private final DeliveryAddressRepository deliveryAddressRepository;
    private final UserRepository userRepository;
    private final DeliveryAddressMapper deliveryAddressMapper;


    @Override
    public List<DeliveryAddressDTO> getAddressesByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        List<DeliveryAddress> addresses = deliveryAddressRepository.findByUserId(user.getId());
        
        return addresses.stream()
                .map(deliveryAddressMapper::toDTO)
                .collect(Collectors.toList());
    }

   
    @Override
    @Transactional
    public void addAddress(String username, DeliveryAddressDTO deliveryAddressDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        // If setting this new address as default, reset all other addresses
        if (deliveryAddressDTO.isDefault()) {
            deliveryAddressRepository.updateDefaultAddresses(user.getId(), false);
        }

        // Convert DTO to entity and save
        DeliveryAddress newAddress = deliveryAddressMapper.toEntity(deliveryAddressDTO, user.getId());
        newAddress.setCreatedAt(new Date());
        newAddress.setUpdatedAt(new Date());
        
        deliveryAddressRepository.save(newAddress);
    }
    
    @Override
    public Optional<DeliveryAddressDTO> getDefaultUserAddress(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        return deliveryAddressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                .map(deliveryAddressMapper::toDTO);
    }
    
    @Override
    @Transactional
    public void updateAddress(String username, DeliveryAddressDTO deliveryAddressDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        DeliveryAddress address = deliveryAddressRepository.findById(deliveryAddressDTO.getId())
                .orElseThrow(() -> new RuntimeException("Address not found with ID: " + deliveryAddressDTO.getId()));

        if (address.getUserId() != user.getId()) {
            throw new RuntimeException("Unauthorized operation. Address does not belong to user.");
        }

        if (deliveryAddressDTO.isDefault()) {
            deliveryAddressRepository.updateDefaultAddresses(user.getId(), false);
        }

        DeliveryAddress updatedAddress = deliveryAddressMapper.toEntity(deliveryAddressDTO, user.getId());
        updatedAddress.setId(address.getId());
        updatedAddress.setUpdatedAt(new Date());

        deliveryAddressRepository.save(updatedAddress);
    }

    @Override
    @Transactional
    public void deleteAddress(String username, long addressId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        DeliveryAddress address = deliveryAddressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found with ID: " + addressId));

        if (address.getUserId() != user.getId()) {
            throw new RuntimeException("Unauthorized operation. Address does not belong to user.");
        }

        deliveryAddressRepository.delete(address);
    }

    

}
