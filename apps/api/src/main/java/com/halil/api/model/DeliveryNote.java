package com.halil.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "delivery_note")
@Getter
@Setter
public class DeliveryNote  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate deliveryDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "deliveryNote", cascade = CascadeType.ALL)
    private List<DeliveryLine> deliveryLines;
}
