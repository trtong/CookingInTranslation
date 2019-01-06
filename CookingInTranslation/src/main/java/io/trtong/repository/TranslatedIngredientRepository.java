package io.trtong.repository;

import io.trtong.domain.TranslatedIngredient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TranslatedIngredient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranslatedIngredientRepository extends JpaRepository<TranslatedIngredient, Long> {

}
