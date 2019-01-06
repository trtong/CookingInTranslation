package io.trtong.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.trtong.domain.TranslatedIngredient;
import io.trtong.repository.TranslatedIngredientRepository;
import io.trtong.web.rest.errors.BadRequestAlertException;
import io.trtong.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TranslatedIngredient.
 */
@RestController
@RequestMapping("/api")
public class TranslatedIngredientResource {

    private final Logger log = LoggerFactory.getLogger(TranslatedIngredientResource.class);

    private static final String ENTITY_NAME = "translatedIngredient";

    private final TranslatedIngredientRepository translatedIngredientRepository;

    public TranslatedIngredientResource(TranslatedIngredientRepository translatedIngredientRepository) {
        this.translatedIngredientRepository = translatedIngredientRepository;
    }

    /**
     * POST  /translated-ingredients : Create a new translatedIngredient.
     *
     * @param translatedIngredient the translatedIngredient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new translatedIngredient, or with status 400 (Bad Request) if the translatedIngredient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/translated-ingredients")
    @Timed
    public ResponseEntity<TranslatedIngredient> createTranslatedIngredient(@Valid @RequestBody TranslatedIngredient translatedIngredient) throws URISyntaxException {
        log.debug("REST request to save TranslatedIngredient : {}", translatedIngredient);
        if (translatedIngredient.getId() != null) {
            throw new BadRequestAlertException("A new translatedIngredient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TranslatedIngredient result = translatedIngredientRepository.save(translatedIngredient);
        return ResponseEntity.created(new URI("/api/translated-ingredients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /translated-ingredients : Updates an existing translatedIngredient.
     *
     * @param translatedIngredient the translatedIngredient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated translatedIngredient,
     * or with status 400 (Bad Request) if the translatedIngredient is not valid,
     * or with status 500 (Internal Server Error) if the translatedIngredient couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/translated-ingredients")
    @Timed
    public ResponseEntity<TranslatedIngredient> updateTranslatedIngredient(@Valid @RequestBody TranslatedIngredient translatedIngredient) throws URISyntaxException {
        log.debug("REST request to update TranslatedIngredient : {}", translatedIngredient);
        if (translatedIngredient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TranslatedIngredient result = translatedIngredientRepository.save(translatedIngredient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, translatedIngredient.getId().toString()))
            .body(result);
    }

    /**
     * GET  /translated-ingredients : get all the translatedIngredients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of translatedIngredients in body
     */
    @GetMapping("/translated-ingredients")
    @Timed
    public List<TranslatedIngredient> getAllTranslatedIngredients() {
        log.debug("REST request to get all TranslatedIngredients");
        return translatedIngredientRepository.findAll();
    }

    /**
     * GET  /translated-ingredients/:id : get the "id" translatedIngredient.
     *
     * @param id the id of the translatedIngredient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the translatedIngredient, or with status 404 (Not Found)
     */
    @GetMapping("/translated-ingredients/{id}")
    @Timed
    public ResponseEntity<TranslatedIngredient> getTranslatedIngredient(@PathVariable Long id) {
        log.debug("REST request to get TranslatedIngredient : {}", id);
        Optional<TranslatedIngredient> translatedIngredient = translatedIngredientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(translatedIngredient);
    }

    /**
     * DELETE  /translated-ingredients/:id : delete the "id" translatedIngredient.
     *
     * @param id the id of the translatedIngredient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/translated-ingredients/{id}")
    @Timed
    public ResponseEntity<Void> deleteTranslatedIngredient(@PathVariable Long id) {
        log.debug("REST request to delete TranslatedIngredient : {}", id);

        translatedIngredientRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
