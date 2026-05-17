package com.fdmgroup.Retail_POD_backend.repository;

import com.fdmgroup.Retail_POD_backend.model.DeliveryAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryAddressRepository extends JpaRepository<DeliveryAddress, Long> {

   
    List<DeliveryAddress> findByUserId(Long userId);

    Optional<DeliveryAddress> findByUserIdAndIsDefaultTrue(Long userId);
    
    void delete(DeliveryAddress address);


    @Modifying
    @Query("UPDATE DeliveryAddress d SET d.isDefault = :defaultValue WHERE d.userId = :userId")
    void updateDefaultAddresses(@Param("userId") long userId, @Param("defaultValue") boolean defaultValue);

    
    @Modifying
    @Transactional
    @Query("UPDATE DeliveryAddress da SET da.isDefault = false WHERE da.userId = :userId")
    void updateAllAddressesToNonDefault(@Param("userId") Long userId);
}
