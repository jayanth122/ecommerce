package com.fdmgroup.Retail_POD_backend.repository;

import com.fdmgroup.Retail_POD_backend.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserAddressRepository extends JpaRepository<UserAddress, Integer> {
    List<UserAddress> findByUserId(long userId);
}
