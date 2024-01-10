package com.project.qlrl.services.common;

import com.project.qlrl.common.CommonFileUtils;
import com.project.qlrl.common.TOTPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

@Service
public class MailService {
    private static long stepsTime = System.currentTimeMillis() / 180000;

    @Autowired
    Environment env;

    public boolean sentVerificationCode(String toEmail, String newPwd) throws IOException, AddressException, MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", env.getProperty("spring.mail.host"));
        props.put("mail.smtp.port", env.getProperty("spring.mail.port"));

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(env.getProperty("spring.mail.username"), env.getProperty("spring.mail.password"));
            }
        });
        Message msg = new MimeMessage(session);
//        File resource = new ClassPathResource("templates/templateMail.html").getFile();
        File resource = new File(CommonFileUtils.getPathDefaultUploadDir()+ "/templates/templateMail.html");
        String html = readFile(resource);
//        String encode = TOTPUtils.getOTP(stepsTime, verifyKey);
        html = html.replace("_VERIFY_CODE_", newPwd);
        msg.setFrom(new InternetAddress(env.getProperty("spring.mail.username"), false));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
        msg.setSubject("Forgot password");
        msg.setContent(html, "text/html");
        msg.setSentDate(new Date());

        Transport.send(msg);

        return true;
    }

    public boolean verifyCode(String code, String verifyKey) {
        String encode = TOTPUtils.getOTP(stepsTime, verifyKey);
        if (encode.equals(code.toString())) {
            return true;
        }else {
            return false;
        }

    }

    public String readFile(File file) throws IOException {
        String result = "";
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line = reader.readLine();
        while (line != null) {
            line = reader.readLine();
            result += line;
        }
        reader.close();
        return result;
    }

}
