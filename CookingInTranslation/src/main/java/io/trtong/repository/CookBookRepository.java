package io.trtong.repository;

import io.trtong.domain.CookBook;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CookBook entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CookBookRepository extends JpaRepository<CookBook, Long> {

}
