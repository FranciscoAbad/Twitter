package com.twitter.services;

import com.twitter.exceptions.UnableToResolvePhotoException;
import com.twitter.exceptions.UnabledToSavePhotoException;
import com.twitter.models.Image;
import com.twitter.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Transactional
public class ImageService {


    private final ImageRepository imageRepository;

    private static final File DIRECTORY = new File("C:\\Users\\fridi\\OneDrive\\Escritorio\\Carpetas escritorio\\Spring Boot\\Twitter\\backend\\twitter-backend\\img");
    private static final String URL="http://localhost:8080/images/";

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public String uploadImage(MultipartFile file, String prefix) throws UnabledToSavePhotoException{
        try{
            String extension="." + file.getContentType().split("/")[1];
            File img=File.createTempFile(prefix,extension,DIRECTORY);

            file.transferTo(img);

            String imageURL=URL+img.getName();

            Image i=new Image(img.getName(),file.getContentType(),img.getPath(),imageURL);

            Image saved=imageRepository.save(i);

            return "file uploaded successfully" + img.getName();


        }catch(IOException e){
           throw new UnabledToSavePhotoException();
        }
    }

    public byte[] downloadImage(String filename) throws UnableToResolvePhotoException{
        try{
            Image image=imageRepository.findImageByImageName(filename).get();

            String filePath=image.getImagePath();

            byte[] imageBytes= Files.readAllBytes(new File(filePath).toPath());

            return imageBytes;
        }catch(IOException e){
            throw new UnableToResolvePhotoException();
        }
    }

    public String getImageType(String fileName){
        Image image=imageRepository.findImageByImageName(fileName).get();

        return image.getImageType();
    }


}
