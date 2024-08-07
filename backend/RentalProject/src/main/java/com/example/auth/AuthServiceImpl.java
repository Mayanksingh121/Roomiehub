package com.example.auth;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.exception.InvalidPasswordException;
import com.example.exception.UserNotFoundException;
import com.example.user.User;
import com.example.user.UserRepository;


@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Boolean validateUser(String userEmail, String userPassword) {
        // TODO Auto-generated method stub
        User user = this.userRepository.findByUserEmail(userEmail);
        if (user == null) {
            throw new UserNotFoundException("User with given email  does not exist");
        }
        if (!user.getUserPassword().equals(userPassword)) {
            throw new InvalidPasswordException("Invalid password");
        }
        return true;
    }

    // @Scheduled(fixedRate = 10000)
    // public void isUserIdle() {
    //     HttpSession session = request.getSession(false);
    //     if (session == null) {
    //         System.out.println("session is over");
    //     }
    // }



}
