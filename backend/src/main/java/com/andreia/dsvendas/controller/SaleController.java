package com.andreia.dsvendas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreia.dsvendas.dto.SaleDTO;
import com.andreia.dsvendas.dto.SaleSuccessDTO;
import com.andreia.dsvendas.dto.SaleSumDTO;
import com.andreia.dsvendas.dto.SellerDTO;
import com.andreia.dsvendas.services.SaleService;
import com.andreia.dsvendas.services.SellerService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService service;
	
	//test:http://localhost:8080/sales?page=1&size=10&sort=date,desc
	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable){
		Page<SaleDTO> list =  service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/amount-by-seller")
	public ResponseEntity<List<SaleSumDTO>> amountGroupBySeller(){
		List<SaleSumDTO> list =  service.amountGroupBySeller();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/success-by-seller")
	public ResponseEntity<List<SaleSuccessDTO>> successGroupBySeller(){
		List<SaleSuccessDTO> list =  service.successGroupBySeller();
		return ResponseEntity.ok(list);
	}


}
