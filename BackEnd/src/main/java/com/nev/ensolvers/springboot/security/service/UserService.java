package com.nev.ensolvers.springboot.security.service;

import com.nev.ensolvers.springboot.model.User;
import com.nev.ensolvers.springboot.security.dto.AuthenticatedUserDto;
import com.nev.ensolvers.springboot.security.dto.RegistrationRequest;
import com.nev.ensolvers.springboot.security.dto.RegistrationResponse;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
public interface UserService {

	User findByUsername(String username);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

}
