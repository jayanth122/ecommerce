package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.CountryAddress;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserAddressDTO;
import com.fdmgroup.Retail_POD_backend.model.UserAddress;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class UserAddressMapperImpl implements UserAddressMapper {

    @Override
    public UserAddressDTO toUserAddressDTO(UserAddress userAddress) {
        if ( userAddress == null ) {
            return null;
        }

        UserAddressDTO userAddressDTO = new UserAddressDTO();

        userAddressDTO.setCountryAddressId( userAddressCountryAddressCountryAddressId( userAddress ) );
        userAddressDTO.setStreetName( userAddressCountryAddressStreetName( userAddress ) );
        userAddressDTO.setStreetNumber( userAddressCountryAddressStreetNumber( userAddress ) );
        userAddressDTO.setPostalCode( userAddressCountryAddressPostalCode( userAddress ) );
        userAddressDTO.setLatitude( userAddressCountryAddressLatitude( userAddress ) );
        userAddressDTO.setLongitude( userAddressCountryAddressLongitude( userAddress ) );
        userAddressDTO.setCityId( userAddressCountryAddressCityId( userAddress ) );
        userAddressDTO.setUserAddressId( userAddress.getUserAddressId() );
        userAddressDTO.setDefault( userAddress.isDefault() );
        userAddressDTO.setCreatedAt( userAddress.getCreatedAt() );
        userAddressDTO.setUserId( (int) userAddress.getUserId() );

        return userAddressDTO;
    }

    @Override
    public UserAddress toUserAddress(UserAddressDTO userAddressDTO) {
        if ( userAddressDTO == null ) {
            return null;
        }

        UserAddress userAddress = new UserAddress();

        userAddress.setCountryAddress( userAddressDTOToCountryAddress( userAddressDTO ) );
        userAddress.setUserAddressId( userAddressDTO.getUserAddressId() );
        userAddress.setDefault( userAddressDTO.isDefault() );
        userAddress.setCreatedAt( userAddressDTO.getCreatedAt() );
        userAddress.setUserId( userAddressDTO.getUserId() );

        return userAddress;
    }

    private int userAddressCountryAddressCountryAddressId(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return 0;
        }
        return countryAddress.getCountryAddressId();
    }

    private String userAddressCountryAddressStreetName(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return null;
        }
        return countryAddress.getStreetName();
    }

    private int userAddressCountryAddressStreetNumber(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return 0;
        }
        return countryAddress.getStreetNumber();
    }

    private String userAddressCountryAddressPostalCode(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return null;
        }
        return countryAddress.getPostalCode();
    }

    private double userAddressCountryAddressLatitude(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return 0.0d;
        }
        return countryAddress.getLatitude();
    }

    private double userAddressCountryAddressLongitude(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return 0.0d;
        }
        return countryAddress.getLongitude();
    }

    private int userAddressCountryAddressCityId(UserAddress userAddress) {
        CountryAddress countryAddress = userAddress.getCountryAddress();
        if ( countryAddress == null ) {
            return 0;
        }
        return countryAddress.getCityId();
    }

    protected CountryAddress userAddressDTOToCountryAddress(UserAddressDTO userAddressDTO) {
        if ( userAddressDTO == null ) {
            return null;
        }

        CountryAddress countryAddress = new CountryAddress();

        countryAddress.setCountryAddressId( userAddressDTO.getCountryAddressId() );
        countryAddress.setStreetName( userAddressDTO.getStreetName() );
        countryAddress.setStreetNumber( userAddressDTO.getStreetNumber() );
        countryAddress.setPostalCode( userAddressDTO.getPostalCode() );
        countryAddress.setLatitude( userAddressDTO.getLatitude() );
        countryAddress.setLongitude( userAddressDTO.getLongitude() );
        countryAddress.setCityId( userAddressDTO.getCityId() );

        return countryAddress;
    }
}
