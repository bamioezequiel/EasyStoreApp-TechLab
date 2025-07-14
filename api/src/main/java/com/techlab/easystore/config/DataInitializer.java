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

        Product sparkPlugsNGK = new Product();
        sparkPlugsNGK.setName("Juego de 4 bujías NGK BKR5ES-11");
        sparkPlugsNGK.setDescription("Bujías estándar NGK para motores nafteros de 4 cilindros.");
        sparkPlugsNGK.setImageUrl("https://m.media-amazon.com/images/I/71YbR3H5fML._AC_SL1500_.jpg");
        sparkPlugsNGK.setPrice(7500.00);
        sparkPlugsNGK.setStock(60);
        sparkPlugsNGK.setCategory(cars);

        Product sparkPlugsNGKIridium = new Product();
        sparkPlugsNGKIridium.setName("NGK Laser Iridium ILKAR7B11");
        sparkPlugsNGKIridium.setDescription("Alta performance, punta de iridio de 0.6 mm.");
        sparkPlugsNGKIridium.setImageUrl("https://m.media-amazon.com/images/I/61O7zi4zEOL._AC_SL1000_.jpg");
        sparkPlugsNGKIridium.setPrice(12000.00);
        sparkPlugsNGKIridium.setStock(40);
        sparkPlugsNGKIridium.setCategory(cars);

        Product sparkPlugsNGKVPower = new Product();
        sparkPlugsNGKVPower.setName("NGK V‑Power Race Plug");
        sparkPlugsNGKVPower.setDescription("Kit de 4 bujías racing no-resistor para Miata.");
        sparkPlugsNGKVPower.setImageUrl("https://fab9tuning.com/cdn/shop/products/NGK-V-Power-race-plug_1024x1024.jpg");
        sparkPlugsNGKVPower.setPrice(13000.00);
        sparkPlugsNGKVPower.setStock(30);
        sparkPlugsNGKVPower.setCategory(cars);

        Product sparkPlugsNGKS58 = new Product();
        sparkPlugsNGKS58.setName("NGK 96206 Laser Iridium S58/B58");
        sparkPlugsNGKS58.setDescription("Para BMW S58 y B58, centrado fino de iridio.");
        sparkPlugsNGKS58.setImageUrl("https://burgertuning.com/cdn/shop/products/sparkplug-s58-item.png");
        sparkPlugsNGKS58.setPrice(18000.00);
        sparkPlugsNGKS58.setStock(25);
        sparkPlugsNGKS58.setCategory(cars);

        Product oilFilterBosch = new Product();
        oilFilterBosch.setName("Filtro de aceite Bosch 3323");
        oilFilterBosch.setDescription("Filtro metálico para auto 1.4–2.0 L.");
        oilFilterBosch.setImageUrl("https://content2.autoanything.com/content/productimages/750/OF3323_Bosch_Oil_Filter_750.jpg");
        oilFilterBosch.setPrice(3500.00);
        oilFilterBosch.setStock(45);
        oilFilterBosch.setCategory(cars);

        Product airFilterMann = new Product();
        airFilterMann.setName("Filtro de aire Mann C 30110");
        airFilterMann.setDescription("Optimiza flujo de aire y eficiencia.");
        airFilterMann.setImageUrl("https://assets.autoanything.com/content/productimages/750/AM30110_Mann-Air-Filter_750.jpg");
        airFilterMann.setPrice(2800.00);
        airFilterMann.setStock(70);
        airFilterMann.setCategory(cars);

        Product carBatteryMoura = new Product();
        carBatteryMoura.setName("Batería Moura 12 V 60 Ah");
        carBatteryMoura.setDescription("Batería húmeda para autos compactos.");
        carBatteryMoura.setImageUrl("https://www.moura.com/wp-content/uploads/2020/10/Moura-Power-C60-60Ah.jpg");
        carBatteryMoura.setPrice(48000.00);
        carBatteryMoura.setStock(20);
        carBatteryMoura.setCategory(cars);

        Product brakePadsFerodo = new Product();
        brakePadsFerodo.setName("Pastillas de freno delanteras Ferodo");
        brakePadsFerodo.setDescription("Silenciosas, alto coeficiente de fricción.");
        brakePadsFerodo.setImageUrl("https://partmart.com/getimage.aspx?imgID=134123");
        brakePadsFerodo.setPrice(8200.00);
        brakePadsFerodo.setStock(35);
        brakePadsFerodo.setCategory(cars);

        Product motorOilMobil = new Product();
        motorOilMobil.setName("Aceite sintético Mobil 1 5W‑30 4 L");
        motorOilMobil.setDescription("Alta protección para motores modernos.");
        motorOilMobil.setImageUrl("https://m.media-amazon.com/images/I/71I2Yub8nEL._AC_SL1500_.jpg");
        motorOilMobil.setPrice(10500.00);
        motorOilMobil.setStock(50);
        motorOilMobil.setCategory(cars);

        Product wiperBladesBosch = new Product();
        wiperBladesBosch.setName("Limpia parabrisas Bosch Aerotwin 22\"");
        wiperBladesBosch.setDescription("Diseño aerodinámico y reducción de ruido.");
        wiperBladesBosch.setImageUrl("https://m.media-amazon.com/images/I/61usNbi+0sL._AC_SL1500_.jpg");
        wiperBladesBosch.setPrice(2900.00);
        wiperBladesBosch.setStock(80);
        wiperBladesBosch.setCategory(cars);

        Product timingBeltContinental = new Product();
        timingBeltContinental.setName("Correa distribución Continental CT1020");
        timingBeltContinental.setDescription("Alta durabilidad y resistencia térmica.");
        timingBeltContinental.setImageUrl("https://shop.continental-aftermarket.com/media/catalog/product/c/t/ct1020_c2.jpg");
        timingBeltContinental.setPrice(13400.00);
        timingBeltContinental.setStock(25);
        timingBeltContinental.setCategory(cars);

        Product coolantTotal = new Product();
        coolantTotal.setName("Refrigerante Total Glacelf 5 L");
        coolantTotal.setDescription("Protección avanzada contra el sobrecalentamiento.");
        coolantTotal.setImageUrl("https://www.totalenergies.com/sites/g/files/nytnzq116/files/styles/media_full/public/2022-07/GlacelfTM_G12%2B_Autonomic_Image_5L_0.png");
        coolantTotal.setPrice(7200.00);
        coolantTotal.setStock(40);
        coolantTotal.setCategory(cars);

        Product tireInflator = new Product();
        tireInflator.setName("Inflador eléctrico 12 V para neumáticos");
        tireInflator.setDescription("Portátil con apagado automático por presión.");
        tireInflator.setImageUrl("https://m.media-amazon.com/images/I/71OOS9D6tXL._AC_SL1500_.jpg");
        tireInflator.setPrice(9400.00);
        tireInflator.setStock(28);
        tireInflator.setCategory(cars);

        Product ledHeadlights = new Product();
        ledHeadlights.setName("Kit de luces LED H7 6500 K");
        ledHeadlights.setDescription("Mejor visibilidad y bajo consumo.");
        ledHeadlights.setImageUrl("https://m.media-amazon.com/images/I/61+piOiUOhL._AC_SL1000_.jpg");
        ledHeadlights.setPrice(11200.00);
        ledHeadlights.setStock(37);
        ledHeadlights.setCategory(cars);

        productRepository.saveAll(Arrays.asList(
                oilFilterBosch,
                airFilterMann,
                carBatteryMoura,
                brakePadsFerodo,
                timingBeltContinental,
                coolantTotal,
                tireInflator,
                ledHeadlights,
                sparkPlugsNGKIridium,
                sparkPlugsNGKVPower
        ));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(encoder.encode("admin123"));
        admin.setRole(adminRole);

        userRepository.save(admin);
    }
}
