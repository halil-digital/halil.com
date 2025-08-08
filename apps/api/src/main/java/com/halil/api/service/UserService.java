package com.halil.api.service;

import com.halil.api.model.User;
import com.halil.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return new ArrayList<>(userRepository.findAll());
    }
}
