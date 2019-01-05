package io.trtong.repository;

import io.trtong.domain.CookBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CookBook entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CookBookRepository extends JpaRepository<CookBook, Long> {

    @Query(value = "select distinct cook_book from CookBook cook_book left join fetch cook_book.allRecipes left join fetch cook_book.translatedRecipes",
        countQuery = "select count(distinct cook_book) from CookBook cook_book")
    Page<CookBook> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct cook_book from CookBook cook_book left join fetch cook_book.allRecipes left join fetch cook_book.translatedRecipes")
    List<CookBook> findAllWithEagerRelationships();

    @Query("select cook_book from CookBook cook_book left join fetch cook_book.allRecipes left join fetch cook_book.translatedRecipes where cook_book.id =:id")
    Optional<CookBook> findOneWithEagerRelationships(@Param("id") Long id);

}
