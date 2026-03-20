package com.luckyride.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/distance")
@CrossOrigin(origins = "*")
public class DistanceController {

    @GetMapping
    public double getDistance(
            @RequestParam double pickupLat,
            @RequestParam double pickupLng,
            @RequestParam double dropLat,
            @RequestParam double dropLng
    ) {

        String url = "http://router.project-osrm.org/route/v1/driving/"
                + pickupLng + "," + pickupLat + ";"
                + dropLng + "," + dropLat
                + "?overview=false";

        RestTemplate restTemplate = new RestTemplate();

        Map response = restTemplate.getForObject(url, Map.class);

        if (response == null) return 0;

        var routes = (java.util.List<Map>) response.get("routes");

        if (routes.isEmpty()) return 0;

        double distanceMeters =
                (double) routes.get(0).get("distance");

        return distanceMeters / 1000; // km
    }
}