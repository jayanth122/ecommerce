package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.DTO.UserAddressDTO;
import com.fdmgroup.Retail_POD_backend.model.UserAddress;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserAddressMapper {

    @Mapping(source = "countryAddress.countryAddressId", target = "countryAddressId")
    @Mapping(source = "countryAddress.streetName", target = "streetName")
    @Mapping(source = "countryAddress.streetNumber", target = "streetNumber")
    @Mapping(source = "countryAddress.postalCode", target = "postalCode")
    @Mapping(source = "countryAddress.latitude", target = "latitude")
    @Mapping(source = "countryAddress.longitude", target = "longitude")
    @Mapping(source = "countryAddress.cityId", target = "cityId")
    UserAddressDTO toUserAddressDTO(UserAddress userAddress);

    @Mapping(source = "countryAddressId", target = "countryAddress.countryAddressId")
    @Mapping(source = "streetName", target = "countryAddress.streetName")
    @Mapping(source = "streetNumber", target = "countryAddress.streetNumber")
    @Mapping(source = "postalCode", target = "countryAddress.postalCode")
    @Mapping(source = "latitude", target = "countryAddress.latitude")
    @Mapping(source = "longitude", target = "countryAddress.longitude")
    @Mapping(source = "cityId", target = "countryAddress.cityId")
    UserAddress toUserAddress(UserAddressDTO userAddressDTO);
}
