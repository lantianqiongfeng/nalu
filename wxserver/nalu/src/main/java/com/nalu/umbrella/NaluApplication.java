package com.nalu.umbrella;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;

@SpringBootApplication
@Slf4j
public class NaluApplication {

    public static void main(String[] args) {
        log.info("启动开始====");
        SpringApplication springApplication = new SpringApplication(NaluApplication.class);
        springApplication.addListeners(new ApplicationPidFileWriter());
        springApplication.run(args);
        log.info("启动结束====");
    }

}
