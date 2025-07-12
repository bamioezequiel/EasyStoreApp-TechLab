package com.techlab.easystore.config;

import com.techlab.easystore.model.Category;
import com.techlab.easystore.model.Product;
import com.techlab.easystore.model.Role;
import com.techlab.easystore.model.User;
import com.techlab.easystore.repository.CategoryRepository;
import com.techlab.easystore.repository.ProductRepository;
import com.techlab.easystore.repository.RoleRepository;
import com.techlab.easystore.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public DataInitializer(CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           RoleRepository roleRepository,
                           UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return;
        }

        Role adminRole = new Role();
        adminRole.setName("ADMIN");

        Role userRole = new Role();
        userRole.setName("USER");

        roleRepository.saveAll(Arrays.asList(adminRole, userRole));

        Category cars = new Category();
        cars.setName("Coches");

        categoryRepository.saveAll(Arrays.asList(cars));

        Product engineOil = new Product();
        engineOil.setName("Aceite de motor 10W-40");
        engineOil.setDescription("Aceite sintético premium para autos a gasolina.");
        engineOil.setImageUrl("https://example.com/engineOil.jpg");
        engineOil.setPrice(8500.00);
        engineOil.setStock(40);
        engineOil.setCategory(cars);

        Product sparkPlugs = new Product();
        sparkPlugs.setName("Juego de 4 bujías NGK");
        sparkPlugs.setDescription("Compatibles con motores nafteros de 4 cilindros.");
        sparkPlugs.setImageUrl("https://example.com/sparkPlugs.jpg");
        sparkPlugs.setPrice(6000.00);
        sparkPlugs.setStock(60);
        sparkPlugs.setCategory(cars);

        Product windshieldWipers = new Product();
        windshieldWipers.setName("Escobillas limpiaparabrisas 22''");
        windshieldWipers.setDescription("Par de escobillas universales para parabrisas.");
        windshieldWipers.setImageUrl("https://example.com/wipers.jpg");
        windshieldWipers.setPrice(2500.00);
        windshieldWipers.setStock(80);
        windshieldWipers.setCategory(cars);

        productRepository.saveAll(Arrays.asList(engineOil, sparkPlugs, windshieldWipers));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(encoder.encode("admin123"));
        admin.setRole(adminRole);

        userRepository.save(admin);
    }
}
