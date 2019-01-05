package io.trtong.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.trtong.domain.CookBook;
import io.trtong.repository.CookBookRepository;
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
 * REST controller for managing CookBook.
 */
@RestController
@RequestMapping("/api")
public class CookBookResource {

    private final Logger log = LoggerFactory.getLogger(CookBookResource.class);

    private static final String ENTITY_NAME = "cookBook";

    private final CookBookRepository cookBookRepository;

    public CookBookResource(CookBookRepository cookBookRepository) {
        this.cookBookRepository = cookBookRepository;
    }

    /**
     * POST  /cook-books : Create a new cookBook.
     *
     * @param cookBook the cookBook to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cookBook, or with status 400 (Bad Request) if the cookBook has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cook-books")
    @Timed
    public ResponseEntity<CookBook> createCookBook(@Valid @RequestBody CookBook cookBook) throws URISyntaxException {
        log.debug("REST request to save CookBook : {}", cookBook);
        if (cookBook.getId() != null) {
            throw new BadRequestAlertException("A new cookBook cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CookBook result = cookBookRepository.save(cookBook);
        return ResponseEntity.created(new URI("/api/cook-books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cook-books : Updates an existing cookBook.
     *
     * @param cookBook the cookBook to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cookBook,
     * or with status 400 (Bad Request) if the cookBook is not valid,
     * or with status 500 (Internal Server Error) if the cookBook couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cook-books")
    @Timed
    public ResponseEntity<CookBook> updateCookBook(@Valid @RequestBody CookBook cookBook) throws URISyntaxException {
        log.debug("REST request to update CookBook : {}", cookBook);
        if (cookBook.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CookBook result = cookBookRepository.save(cookBook);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cookBook.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cook-books : get all the cookBooks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cookBooks in body
     */
    @GetMapping("/cook-books")
    @Timed
    public List<CookBook> getAllCookBooks() {
        log.debug("REST request to get all CookBooks");
        return cookBookRepository.findAll();
    }

    /**
     * GET  /cook-books/:id : get the "id" cookBook.
     *
     * @param id the id of the cookBook to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cookBook, or with status 404 (Not Found)
     */
    @GetMapping("/cook-books/{id}")
    @Timed
    public ResponseEntity<CookBook> getCookBook(@PathVariable Long id) {
        log.debug("REST request to get CookBook : {}", id);
        Optional<CookBook> cookBook = cookBookRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cookBook);
    }

    /**
     * DELETE  /cook-books/:id : delete the "id" cookBook.
     *
     * @param id the id of the cookBook to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cook-books/{id}")
    @Timed
    public ResponseEntity<Void> deleteCookBook(@PathVariable Long id) {
        log.debug("REST request to delete CookBook : {}", id);

        cookBookRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
