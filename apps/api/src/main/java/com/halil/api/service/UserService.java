package com.halil.api.service;

import com.halil.api.model.User;
import com.halil.api.model.WorkingHours;
import com.halil.api.repository.UserRepository;
import com.halil.api.repository.WorkingHoursRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final WorkingHoursRepository workingHoursRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, WorkingHoursRepository workingHoursRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.workingHoursRepository = workingHoursRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public User updateUser(Long id, User user) {
        return userRepository.findById(id)
                .map(existing -> {
                    if (user.getName() != null) existing.setName(user.getName());
                    if (user.getEmail() != null) existing.setEmail(user.getEmail());

                    if (user.getPassword() != null) {
                        String encodedPassword = passwordEncoder.encode(user.getPassword());
                        existing.setPassword(encodedPassword);
                    }

                    if (user.getRole() != null) existing.setRole(user.getRole());

                    if (user.getWorkingHours() != null) {
                        List<WorkingHours> updatedHours = new ArrayList<>();
                        for (WorkingHours whData : user.getWorkingHours()) {
                            WorkingHours wh;
                            if (whData.getId() != null) {
                                wh = workingHoursRepository.findById(whData.getId())
                                        .orElse(new WorkingHours());
                            } else {
                                wh = new WorkingHours();
                            }
                            wh.setDayOfWeek(whData.getDayOfWeek());
                            wh.setOpenTime(whData.getOpenTime());
                            wh.setCloseTime(whData.getCloseTime());
                            wh.setUser(existing);
                            updatedHours.add(workingHoursRepository.save(wh));
                        }
                        existing.setWorkingHours(updatedHours);
                    }

                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
