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

        Category technology = new Category();
        technology.setName("Tecnología");

        categoryRepository.saveAll(Arrays.asList(technology));

        Product ssdSamsung = new Product();
        ssdSamsung.setName("SSD Samsung 970 EVO Plus 1TB");
        ssdSamsung.setDescription("Unidad SSD NVMe de alta velocidad para computadoras.");
        ssdSamsung.setImageUrl("https://m.media-amazon.com/images/I/71OYNmVRFhL._AC_UY327_FMwebp_QL65_.jpg");
        ssdSamsung.setPrice(35000.00);
        ssdSamsung.setStock(25);
        ssdSamsung.setCategory(technology);

        Product laptopDell = new Product();
        laptopDell.setName(getName());
        laptopDell.setDescription("Laptop ultradelgada con procesador Intel i7 de 11va generación.");
        laptopDell.setImageUrl("https://m.media-amazon.com/images/I/71qhlMAlQNL._AC_UY327_FMwebp_QL65_.jpg");
        laptopDell.setPrice(150000.00);
        laptopDell.setStock(15);
        laptopDell.setCategory(technology);

        Product monitorSamsung = new Product();
        monitorSamsung.setName("Monitor Samsung Curvo 27\"");
        monitorSamsung.setDescription("Monitor curvo con resolución QHD para gaming y diseño.");
        monitorSamsung.setImageUrl("https://m.media-amazon.com/images/I/619WSKm18ZL._AC_UY327_FMwebp_QL65_.jpg");
        monitorSamsung.setPrice(45000.00);
        monitorSamsung.setStock(20);
        monitorSamsung.setCategory(technology);

        Product mouseLogitech = new Product();
        mouseLogitech.setName("Mouse Logitech MX Master 3");
        mouseLogitech.setDescription("Mouse inalámbrico avanzado para productividad.");
        mouseLogitech.setImageUrl("https://logitechar.vtexassets.com/arquivos/ids/157412-1200-1200?v=637248874952300000&width=1200&height=1200&aspect=true");
        mouseLogitech.setPrice(12000.00);
        mouseLogitech.setStock(50);
        mouseLogitech.setCategory(technology);

        Product tecladoRazer = new Product();
        tecladoRazer.setName("Teclado mecánico Razer BlackWidow");
        tecladoRazer.setDescription("Teclado gaming RGB con switches mecánicos.");
        tecladoRazer.setImageUrl("https://m.media-amazon.com/images/I/815XJdl7fXL._AC_SL1500_.jpg");
        tecladoRazer.setPrice(18000.00);
        tecladoRazer.setStock(30);
        tecladoRazer.setCategory(technology);

        Product auricularesSony = new Product();
        auricularesSony.setName("Auriculares Sony WH-1000XM4");
        auricularesSony.setDescription("Auriculares inalámbricos con cancelación de ruido.");
        auricularesSony.setImageUrl("https://m.media-amazon.com/images/I/61oqO1AMbdL._AC_SL1500_.jpg");
        auricularesSony.setPrice(35000.00);
        auricularesSony.setStock(40);
        auricularesSony.setCategory(technology);

        Product gpuNvidia = new Product();
        gpuNvidia.setName("Tarjeta gráfica NVIDIA RTX 3080");
        gpuNvidia.setDescription("GPU de alto rendimiento para gaming y creación.");
        gpuNvidia.setImageUrl("https://m.media-amazon.com/images/I/813Lh2QIZNL._AC_UY327_FMwebp_QL65_.jpg");
        gpuNvidia.setPrice(250000.00);
        gpuNvidia.setStock(10);
        gpuNvidia.setCategory(technology);

        Product fuenteCorsair = new Product();
        fuenteCorsair.setName("Fuente Corsair RM750x 750W");
        fuenteCorsair.setDescription("Fuente de poder modular, eficiente y silenciosa.");
        fuenteCorsair.setImageUrl("https://m.media-amazon.com/images/I/61tOgJ849GL._AC_UY327_FMwebp_QL65_.jpg");
        fuenteCorsair.setPrice(20000.00);
        fuenteCorsair.setStock(22);
        fuenteCorsair.setCategory(technology);

        Product placaMadreAsus = new Product();
        placaMadreAsus.setName("Placa Madre ASUS ROG Strix B550-F");
        placaMadreAsus.setDescription("Motherboard para procesadores AMD Ryzen con Wi-Fi.");
        placaMadreAsus.setImageUrl("https://m.media-amazon.com/images/I/81S9D7bqEzL._AC_UY327_FMwebp_QL65_.jpg");
        placaMadreAsus.setPrice(45000.00);
        placaMadreAsus.setStock(18);
        placaMadreAsus.setCategory(technology);

        productRepository.saveAll(Arrays.asList(
                ssdSamsung,
                laptopDell,
                monitorSamsung,
                mouseLogitech,
                tecladoRazer,
                auricularesSony,
                gpuNvidia,
                fuenteCorsair,
                placaMadreAsus
        ));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(encoder.encode("admin123"));
        admin.setRole(adminRole);

        userRepository.save(admin);
    }

    private static String getName() {
        return "Laptop Dell XPS 13";
    }
}
