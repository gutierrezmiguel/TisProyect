package com.pwa.ovaApi.Entities;

import com.pwa.ovaApi.Entities.Ova;
import com.pwa.ovaApi.Entities.User;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

@Embeddable
public class ScoreId implements Serializable {

    @ManyToOne
    @JoinColumn(name= "id_ova",referencedColumnName = "id_ova")
    private Ova ova;

    @ManyToOne
    @JoinColumn(name= "id_user",referencedColumnName = "id_user")
    private User user;
}
