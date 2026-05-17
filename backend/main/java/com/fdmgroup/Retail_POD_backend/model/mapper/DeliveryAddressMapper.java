package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.DeliveryAddress;
import com.fdmgroup.Retail_POD_backend.model.DTO.DeliveryAddressDTO;
import org.springframework.stereotype.Component;

@Component
public class DeliveryAddressMapper {

    // Convert Entity → DTO
    public DeliveryAddressDTO toDTO(DeliveryAddress entity) {
        return new DeliveryAddressDTO(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getPhoneNumber(),
                entity.getUnitNumber(),
                entity.getStreetNumber(),
                entity.getStreetName(),
                entity.getPostalCode(),
                entity.getCity(),
                entity.getStateProvince(),
                entity.getCountry(),
                entity.getLatitude(),
                entity.getLongitude(),
                entity.isDefault(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    // Convert DTO → Entity (for adding/updating addresses)
    public DeliveryAddress toEntity(DeliveryAddressDTO dto, long userId) {
        DeliveryAddress entity = new DeliveryAddress();
        entity.setUserId(userId);
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setUnitNumber(dto.getUnitNumber());
        entity.setStreetNumber(dto.getStreetNumber());
        entity.setStreetName(dto.getStreetName());
        entity.setPostalCode(dto.getPostalCode());
        entity.setCity(dto.getCity());
        entity.setStateProvince(dto.getStateProvince());
        entity.setCountry(dto.getCountry());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setDefault(dto.isDefault());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }
}
