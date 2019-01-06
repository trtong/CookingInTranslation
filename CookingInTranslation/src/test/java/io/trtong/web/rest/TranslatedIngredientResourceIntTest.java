package io.trtong.web.rest;

import io.trtong.CookingInTranslationApp;

import io.trtong.domain.TranslatedIngredient;
import io.trtong.repository.TranslatedIngredientRepository;
import io.trtong.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.trtong.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.trtong.domain.enumeration.Language;
/**
 * Test class for the TranslatedIngredientResource REST controller.
 *
 * @see TranslatedIngredientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CookingInTranslationApp.class)
public class TranslatedIngredientResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.SPANISH;

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TranslatedIngredientRepository translatedIngredientRepository;

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

    private MockMvc restTranslatedIngredientMockMvc;

    private TranslatedIngredient translatedIngredient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TranslatedIngredientResource translatedIngredientResource = new TranslatedIngredientResource(translatedIngredientRepository);
        this.restTranslatedIngredientMockMvc = MockMvcBuilders.standaloneSetup(translatedIngredientResource)
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
    public static TranslatedIngredient createEntity(EntityManager em) {
        TranslatedIngredient translatedIngredient = new TranslatedIngredient()
            .name(DEFAULT_NAME)
            .language(DEFAULT_LANGUAGE)
            .amount(DEFAULT_AMOUNT)
            .unit(DEFAULT_UNIT)
            .description(DEFAULT_DESCRIPTION);
        return translatedIngredient;
    }

    @Before
    public void initTest() {
        translatedIngredient = createEntity(em);
    }

    @Test
    @Transactional
    public void createTranslatedIngredient() throws Exception {
        int databaseSizeBeforeCreate = translatedIngredientRepository.findAll().size();

        // Create the TranslatedIngredient
        restTranslatedIngredientMockMvc.perform(post("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isCreated());

        // Validate the TranslatedIngredient in the database
        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeCreate + 1);
        TranslatedIngredient testTranslatedIngredient = translatedIngredientList.get(translatedIngredientList.size() - 1);
        assertThat(testTranslatedIngredient.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTranslatedIngredient.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testTranslatedIngredient.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testTranslatedIngredient.getUnit()).isEqualTo(DEFAULT_UNIT);
        assertThat(testTranslatedIngredient.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTranslatedIngredientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = translatedIngredientRepository.findAll().size();

        // Create the TranslatedIngredient with an existing ID
        translatedIngredient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranslatedIngredientMockMvc.perform(post("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isBadRequest());

        // Validate the TranslatedIngredient in the database
        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = translatedIngredientRepository.findAll().size();
        // set the field null
        translatedIngredient.setName(null);

        // Create the TranslatedIngredient, which fails.

        restTranslatedIngredientMockMvc.perform(post("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isBadRequest());

        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = translatedIngredientRepository.findAll().size();
        // set the field null
        translatedIngredient.setLanguage(null);

        // Create the TranslatedIngredient, which fails.

        restTranslatedIngredientMockMvc.perform(post("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isBadRequest());

        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = translatedIngredientRepository.findAll().size();
        // set the field null
        translatedIngredient.setAmount(null);

        // Create the TranslatedIngredient, which fails.

        restTranslatedIngredientMockMvc.perform(post("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isBadRequest());

        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = translatedIngredientRepository.findAll().size();
        // set the field null
        translatedIngredient.setUnit(null);

        // Create the TranslatedIngredient, which fails.

        restTranslatedIngredientMockMvc.perform(post("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isBadRequest());

        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTranslatedIngredients() throws Exception {
        // Initialize the database
        translatedIngredientRepository.saveAndFlush(translatedIngredient);

        // Get all the translatedIngredientList
        restTranslatedIngredientMockMvc.perform(get("/api/translated-ingredients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(translatedIngredient.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getTranslatedIngredient() throws Exception {
        // Initialize the database
        translatedIngredientRepository.saveAndFlush(translatedIngredient);

        // Get the translatedIngredient
        restTranslatedIngredientMockMvc.perform(get("/api/translated-ingredients/{id}", translatedIngredient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(translatedIngredient.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTranslatedIngredient() throws Exception {
        // Get the translatedIngredient
        restTranslatedIngredientMockMvc.perform(get("/api/translated-ingredients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTranslatedIngredient() throws Exception {
        // Initialize the database
        translatedIngredientRepository.saveAndFlush(translatedIngredient);

        int databaseSizeBeforeUpdate = translatedIngredientRepository.findAll().size();

        // Update the translatedIngredient
        TranslatedIngredient updatedTranslatedIngredient = translatedIngredientRepository.findById(translatedIngredient.getId()).get();
        // Disconnect from session so that the updates on updatedTranslatedIngredient are not directly saved in db
        em.detach(updatedTranslatedIngredient);
        updatedTranslatedIngredient
            .name(UPDATED_NAME)
            .language(UPDATED_LANGUAGE)
            .amount(UPDATED_AMOUNT)
            .unit(UPDATED_UNIT)
            .description(UPDATED_DESCRIPTION);

        restTranslatedIngredientMockMvc.perform(put("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTranslatedIngredient)))
            .andExpect(status().isOk());

        // Validate the TranslatedIngredient in the database
        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeUpdate);
        TranslatedIngredient testTranslatedIngredient = translatedIngredientList.get(translatedIngredientList.size() - 1);
        assertThat(testTranslatedIngredient.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTranslatedIngredient.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testTranslatedIngredient.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTranslatedIngredient.getUnit()).isEqualTo(UPDATED_UNIT);
        assertThat(testTranslatedIngredient.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTranslatedIngredient() throws Exception {
        int databaseSizeBeforeUpdate = translatedIngredientRepository.findAll().size();

        // Create the TranslatedIngredient

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranslatedIngredientMockMvc.perform(put("/api/translated-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedIngredient)))
            .andExpect(status().isBadRequest());

        // Validate the TranslatedIngredient in the database
        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTranslatedIngredient() throws Exception {
        // Initialize the database
        translatedIngredientRepository.saveAndFlush(translatedIngredient);

        int databaseSizeBeforeDelete = translatedIngredientRepository.findAll().size();

        // Get the translatedIngredient
        restTranslatedIngredientMockMvc.perform(delete("/api/translated-ingredients/{id}", translatedIngredient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TranslatedIngredient> translatedIngredientList = translatedIngredientRepository.findAll();
        assertThat(translatedIngredientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslatedIngredient.class);
        TranslatedIngredient translatedIngredient1 = new TranslatedIngredient();
        translatedIngredient1.setId(1L);
        TranslatedIngredient translatedIngredient2 = new TranslatedIngredient();
        translatedIngredient2.setId(translatedIngredient1.getId());
        assertThat(translatedIngredient1).isEqualTo(translatedIngredient2);
        translatedIngredient2.setId(2L);
        assertThat(translatedIngredient1).isNotEqualTo(translatedIngredient2);
        translatedIngredient1.setId(null);
        assertThat(translatedIngredient1).isNotEqualTo(translatedIngredient2);
    }
}
