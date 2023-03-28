package com.DuTongChitongYutong.EverybodyChachapark.storage.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.util.List;

public class FileDeletesEvent extends ApplicationEvent {
    @Getter
    private final List<String> files;

    public FileDeletesEvent(Object source, List<String> files) {
        super(source);
        this.files = files;
    }
}
