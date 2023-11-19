package com.project.qlrl.controllers;

import com.project.qlrl.services.CommonService;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import java.io.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CommonController {

    @Autowired
    CommonService commonService;
    @Value("${source.file}")
    String contextPath;
    @GetMapping("/getMenuByRole")
    public Map<Object,Object> getMenuByRole(@RequestParam Map param){
        return commonService.getMenuByRole(param);
    }

    @GetMapping("/img-view/{fileName}")
    public ResponseEntity<byte[]> getImg(@PathVariable("fileName")String fileName) throws IOException {
        String path = contextPath + fileName;
        File file = new File(path);
        InputStream is = new FileInputStream(file);
        byte[] data = IOUtils.toByteArray(is);
        HttpHeaders headers = getHeaderContent(fileName);
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }

    private HttpHeaders getHeaderContent(String fileName){
        String fileType = FilenameUtils.getExtension(fileName);
        HttpHeaders headers = new HttpHeaders();
        if (fileType.equals("png")){
            headers.setContentType(MediaType.IMAGE_PNG);
        }
        if(fileType.equals("jpg")){
            headers.setContentType(MediaType.IMAGE_JPEG);
        }
        if(fileType.equals("gif")){
            headers.setContentType(MediaType.IMAGE_GIF);
        }
        return headers;
    }

}
