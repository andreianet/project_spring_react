package com.andreia.dsvendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andreia.dsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

}
