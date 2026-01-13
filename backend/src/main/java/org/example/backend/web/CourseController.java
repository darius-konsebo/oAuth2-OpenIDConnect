package org.example.backend.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CourseController {

    @GetMapping("/courses")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public List<String> getCourses() {
        return List.of("Math", "Physics", "History");
    }

    @PostMapping("/courses")
    @PreAuthorize("hasRole('ADMIN')")
    public String addCourse(@RequestBody String course) {
        return "Added course: " + course;
    }

    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
        return jwt.getClaims();
    }
}
