package com.luckyride.exception;

import com.luckyride.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ Handle CustomException
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<Object>> handleCustomException(CustomException ex) {

        return new ResponseEntity<>(
                new ApiResponse<>(
                        false,
                        ex.getMessage(),
                        null
                ),
                ex.getStatus()
        );
    }

            // ✅ Handle all other exceptions
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {

                     ex.printStackTrace(); // 🔥 THIS LINE IS KEY

                return new ResponseEntity<>(
                    new ApiResponse<>(
                         false,
                            ex.getMessage(), // ✅ show real error
                           null
                        ),
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
        }
}