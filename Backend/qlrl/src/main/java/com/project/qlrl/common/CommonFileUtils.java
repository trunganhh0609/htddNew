package com.project.qlrl.common;

import com.project.qlrl.repository.ClassRepository;
import com.project.qlrl.services.ClassService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CommonFileUtils {

    private static String pathUploadDir;
    private static String pathUploadTrainDataDir;

    @Autowired
    private Environment env;

    @Autowired
    ClassRepository classRepository;

    @Autowired
    ClassService classService;

    @PostConstruct
    public void init() {
        pathUploadDir = env.getProperty("path.upload.dir");
        pathUploadTrainDataDir = env.getProperty("path.upload.data.dir");
    }

    public static String getPathDefaultUploadDir() {
        return pathUploadDir;
    }

    public static String getPathDefaultUploadTrainDataDir() {
        return pathUploadTrainDataDir;
    }

    public static byte[] convertToBytes(File file) {
        try {
            return FileUtils.readFileToByteArray(file);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public static byte[] getFileByPath(String path) {
        if (StringUtils.isEmpty(path))
            return new byte[0];

        File file = FileUtils.getFile(path);
        return convertToBytes(file);
    }

    public static File save(String path, MultipartFile multipartFile) throws IOException {
        File file = new File(path);
        multipartFile.transferTo(file);
        return file;
    }

    public static String getExt(String nameOrPath) {
        int dotIndex = nameOrPath.lastIndexOf(".");
        if (dotIndex < 0)
            return null;
        return nameOrPath.substring(dotIndex);
    }

    public static String getFileName(String path) {
        int seperatorIndex = path.lastIndexOf("/");
        if (seperatorIndex < 0)
            return null;
        return path.substring(++seperatorIndex);
    }

    public static String getDir(String path) {
        int seperatorIndex = path.lastIndexOf("/");
        if (seperatorIndex < 0)
            return null;
        return path.substring(0, seperatorIndex);
    }

    public static String replaceFileName(String newPrefixFileName, String originFileName) {
        return newPrefixFileName + getExt(originFileName);
    }

    public static void deleteFile(String fileName) {
        File file = new File(pathUploadDir + fileName);
        if (file.exists()) {
            file.delete();
        }
    }

    public static String deleteCharAtLastIndex(String str) {
        str = str.trim().substring(0, str.length() - 1);
        return str;
    }

    public static String getHeadersCsvIfFileHasData(String fileName) throws IOException {
        String path = getPathDefaultUploadDir() + fileName;
        String headers = new String();
        try {
            List<String> lines = Files.readAllLines(Paths.get(path));
            if (lines.size() == 1) {
                return null;
            }
            headers = lines.get(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return headers;
    }

    public static String getHeadersExcelIfFileHasData(String fileName) {
        String path = getPathDefaultUploadDir() + fileName;
        StringBuilder header = new StringBuilder();
        String headers = new String();
        try {
            FileInputStream is = new FileInputStream(new File(path));
            Workbook workbook = new XSSFWorkbook(is);
            Sheet firstSheet = workbook.getSheetAt(0);
            boolean check = false;
            for (Row row : firstSheet) {
                if (row != firstSheet.getRow(0)) {
                    for (Cell cell : row) {
                        if (!cell.getStringCellValue().isEmpty()) {
                            check = true;
                            break;
                        }
                    }
                }
            }
            if (!check) {
                workbook.close();
                return null;
            }
            Row rowHeader = firstSheet.getRow(0);
            for (Cell cell : rowHeader) {
                String colName = cell.getStringCellValue();
                header.append(colName).append(',');
            }
            headers = deleteCharAtLastIndex(header.toString());
            workbook.close();
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return headers;
    }
    @Scheduled(cron = "0 0 0 * * *")
    private void updateStatusSchedule(){
        Map<Object,Object> param = new HashMap<>();
        try {
            param.put("status", "02-02");
            classRepository.updateStatusStart(param);
            param.put("status", "02-03");
            classRepository.updateStatusExpired(param);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}

