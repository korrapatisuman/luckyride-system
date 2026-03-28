package com.luckyride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String to, String otp) {


        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("funnycharitha@gmail.com");
        message.setTo(to);

        message.setSubject("🚖 LuckyRide Login OTP");

        message.setText(
                "Hi 👋,\n\n" +
                "Welcome to LuckyRide! 🚖\n\n" +
                "Your One-Time Password (OTP) for login is:\n\n" +
                "👉 " + otp + "\n\n" +
                "⏱ This OTP is valid for 5 minutes.\n\n" +
                "🔒 For your security, please do not share this OTP with anyone.\n\n" +
                "Enjoy a smooth and safe ride with LuckyRide! 🌟\n\n" +
                "— Team LuckyRide 🚀"
        );

       mailSender.send(message);


    }
}