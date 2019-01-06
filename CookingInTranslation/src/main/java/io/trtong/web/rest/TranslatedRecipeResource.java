package io.trtong.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.trtong.domain.TranslatedRecipe;
import io.trtong.repository.TranslatedRecipeRepository;
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
 * REST controller for managing TranslatedRecipe.
 */
@RestController
@RequestMapping("/api")
public class TranslatedRecipeResource {

    private final Logger log = LoggerFactory.getLogger(TranslatedRecipeResource.class);

    private static final String ENTITY_NAME = "translatedRecipe";

    private final TranslatedRecipeRepository translatedRecipeRepository;

    public TranslatedRecipeResource(TranslatedRecipeRepository translatedRecipeRepository) {
        this.translatedRecipeRepository = translatedRecipeRepository;
    }

    /**
     * POST  /translated-recipes : Create a new translatedRecipe.
     *
     * @param translatedRecipe the translatedRecipe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new translatedRecipe, or with status 400 (Bad Request) if the translatedRecipe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/translated-recipes")
    @Timed
    public ResponseEntity<TranslatedRecipe> createTranslatedRecipe(@Valid @RequestBody TranslatedRecipe translatedRecipe) throws URISyntaxException {
        log.debug("REST request to save TranslatedRecipe : {}", translatedRecipe);
        if (translatedRecipe.getId() != null) {
            throw new BadRequestAlertException("A new translatedRecipe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TranslatedRecipe result = translatedRecipeRepository.save(translatedRecipe);
        return ResponseEntity.created(new URI("/api/translated-recipes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /translated-recipes : Updates an existing translatedRecipe.
     *
     * @param translatedRecipe the translatedRecipe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated translatedRecipe,
     * or with status 400 (Bad Request) if the translatedRecipe is not valid,
     * or with status 500 (Internal Server Error) if the translatedRecipe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/translated-recipes")
    @Timed
    public ResponseEntity<TranslatedRecipe> updateTranslatedRecipe(@Valid @RequestBody TranslatedRecipe translatedRecipe) throws URISyntaxException {
        log.debug("REST request to update TranslatedRecipe : {}", translatedRecipe);
        if (translatedRecipe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TranslatedRecipe result = translatedRecipeRepository.save(translatedRecipe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, translatedRecipe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /translated-recipes : get all the translatedRecipes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of translatedRecipes in body
     */
    @GetMapping("/translated-recipes")
    @Timed
    public List<TranslatedRecipe> getAllTranslatedRecipes() {
        log.debug("REST request to get all TranslatedRecipes");
        return translatedRecipeRepository.findAll();
    }

    /**
     * GET  /translated-recipes/:id : get the "id" translatedRecipe.
     *
     * @param id the id of the translatedRecipe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the translatedRecipe, or with status 404 (Not Found)
     */
    @GetMapping("/translated-recipes/{id}")
    @Timed
    public ResponseEntity<TranslatedRecipe> getTranslatedRecipe(@PathVariable Long id) {
        log.debug("REST request to get TranslatedRecipe : {}", id);
        Optional<TranslatedRecipe> translatedRecipe = translatedRecipeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(translatedRecipe);
    }

    /**
     * DELETE  /translated-recipes/:id : delete the "id" translatedRecipe.
     *
     * @param id the id of the translatedRecipe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/translated-recipes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTranslatedRecipe(@PathVariable Long id) {
        log.debug("REST request to delete TranslatedRecipe : {}", id);

        translatedRecipeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
