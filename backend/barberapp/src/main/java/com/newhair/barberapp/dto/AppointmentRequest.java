package com.newhair.barberapp.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
/* import java.time.LocalDateTime; */


@Data
public class AppointmentRequest {
    private Long barberId;
    private Long serviceId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private java.time.LocalDateTime appointmentTime;

}
