package io.trtong.web.rest;

import io.trtong.CookingInTranslationApp;

import io.trtong.domain.CookBook;
import io.trtong.repository.CookBookRepository;
import io.trtong.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static io.trtong.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CookBookResource REST controller.
 *
 * @see CookBookResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CookingInTranslationApp.class)
public class CookBookResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CookBookRepository cookBookRepository;

    @Mock
    private CookBookRepository cookBookRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCookBookMockMvc;

    private CookBook cookBook;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CookBookResource cookBookResource = new CookBookResource(cookBookRepository);
        this.restCookBookMockMvc = MockMvcBuilders.standaloneSetup(cookBookResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CookBook createEntity(EntityManager em) {
        CookBook cookBook = new CookBook()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return cookBook;
    }

    @Before
    public void initTest() {
        cookBook = createEntity(em);
    }

    @Test
    @Transactional
    public void createCookBook() throws Exception {
        int databaseSizeBeforeCreate = cookBookRepository.findAll().size();

        // Create the CookBook
        restCookBookMockMvc.perform(post("/api/cook-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cookBook)))
            .andExpect(status().isCreated());

        // Validate the CookBook in the database
        List<CookBook> cookBookList = cookBookRepository.findAll();
        assertThat(cookBookList).hasSize(databaseSizeBeforeCreate + 1);
        CookBook testCookBook = cookBookList.get(cookBookList.size() - 1);
        assertThat(testCookBook.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCookBook.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createCookBookWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cookBookRepository.findAll().size();

        // Create the CookBook with an existing ID
        cookBook.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCookBookMockMvc.perform(post("/api/cook-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cookBook)))
            .andExpect(status().isBadRequest());

        // Validate the CookBook in the database
        List<CookBook> cookBookList = cookBookRepository.findAll();
        assertThat(cookBookList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cookBookRepository.findAll().size();
        // set the field null
        cookBook.setName(null);

        // Create the CookBook, which fails.

        restCookBookMockMvc.perform(post("/api/cook-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cookBook)))
            .andExpect(status().isBadRequest());

        List<CookBook> cookBookList = cookBookRepository.findAll();
        assertThat(cookBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCookBooks() throws Exception {
        // Initialize the database
        cookBookRepository.saveAndFlush(cookBook);

        // Get all the cookBookList
        restCookBookMockMvc.perform(get("/api/cook-books?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cookBook.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCookBooksWithEagerRelationshipsIsEnabled() throws Exception {
        CookBookResource cookBookResource = new CookBookResource(cookBookRepositoryMock);
        when(cookBookRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCookBookMockMvc = MockMvcBuilders.standaloneSetup(cookBookResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCookBookMockMvc.perform(get("/api/cook-books?eagerload=true"))
        .andExpect(status().isOk());

        verify(cookBookRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCookBooksWithEagerRelationshipsIsNotEnabled() throws Exception {
        CookBookResource cookBookResource = new CookBookResource(cookBookRepositoryMock);
            when(cookBookRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCookBookMockMvc = MockMvcBuilders.standaloneSetup(cookBookResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCookBookMockMvc.perform(get("/api/cook-books?eagerload=true"))
        .andExpect(status().isOk());

            verify(cookBookRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCookBook() throws Exception {
        // Initialize the database
        cookBookRepository.saveAndFlush(cookBook);

        // Get the cookBook
        restCookBookMockMvc.perform(get("/api/cook-books/{id}", cookBook.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cookBook.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCookBook() throws Exception {
        // Get the cookBook
        restCookBookMockMvc.perform(get("/api/cook-books/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCookBook() throws Exception {
        // Initialize the database
        cookBookRepository.saveAndFlush(cookBook);

        int databaseSizeBeforeUpdate = cookBookRepository.findAll().size();

        // Update the cookBook
        CookBook updatedCookBook = cookBookRepository.findById(cookBook.getId()).get();
        // Disconnect from session so that the updates on updatedCookBook are not directly saved in db
        em.detach(updatedCookBook);
        updatedCookBook
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restCookBookMockMvc.perform(put("/api/cook-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCookBook)))
            .andExpect(status().isOk());

        // Validate the CookBook in the database
        List<CookBook> cookBookList = cookBookRepository.findAll();
        assertThat(cookBookList).hasSize(databaseSizeBeforeUpdate);
        CookBook testCookBook = cookBookList.get(cookBookList.size() - 1);
        assertThat(testCookBook.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCookBook.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCookBook() throws Exception {
        int databaseSizeBeforeUpdate = cookBookRepository.findAll().size();

        // Create the CookBook

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCookBookMockMvc.perform(put("/api/cook-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cookBook)))
            .andExpect(status().isBadRequest());

        // Validate the CookBook in the database
        List<CookBook> cookBookList = cookBookRepository.findAll();
        assertThat(cookBookList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCookBook() throws Exception {
        // Initialize the database
        cookBookRepository.saveAndFlush(cookBook);

        int databaseSizeBeforeDelete = cookBookRepository.findAll().size();

        // Get the cookBook
        restCookBookMockMvc.perform(delete("/api/cook-books/{id}", cookBook.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CookBook> cookBookList = cookBookRepository.findAll();
        assertThat(cookBookList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CookBook.class);
        CookBook cookBook1 = new CookBook();
        cookBook1.setId(1L);
        CookBook cookBook2 = new CookBook();
        cookBook2.setId(cookBook1.getId());
        assertThat(cookBook1).isEqualTo(cookBook2);
        cookBook2.setId(2L);
        assertThat(cookBook1).isNotEqualTo(cookBook2);
        cookBook1.setId(null);
        assertThat(cookBook1).isNotEqualTo(cookBook2);
    }
}
