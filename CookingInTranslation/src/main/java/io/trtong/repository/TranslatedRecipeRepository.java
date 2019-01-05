package io.trtong.repository;

import io.trtong.domain.TranslatedRecipe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TranslatedRecipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranslatedRecipeRepository extends JpaRepository<TranslatedRecipe, Long> {

}
