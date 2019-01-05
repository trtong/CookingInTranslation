package io.trtong.web.rest;

import io.trtong.CookingInTranslationApp;

import io.trtong.domain.TranslatedRecipe;
import io.trtong.repository.TranslatedRecipeRepository;
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
 * Test class for the TranslatedRecipeResource REST controller.
 *
 * @see TranslatedRecipeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CookingInTranslationApp.class)
public class TranslatedRecipeResourceIntTest {

    private static final Integer DEFAULT_SERVING_SIZE = 1;
    private static final Integer UPDATED_SERVING_SIZE = 2;

    private static final String DEFAULT_INSTRUCTIONS = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUCTIONS = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.SPANISH;

    @Autowired
    private TranslatedRecipeRepository translatedRecipeRepository;

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

    private MockMvc restTranslatedRecipeMockMvc;

    private TranslatedRecipe translatedRecipe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TranslatedRecipeResource translatedRecipeResource = new TranslatedRecipeResource(translatedRecipeRepository);
        this.restTranslatedRecipeMockMvc = MockMvcBuilders.standaloneSetup(translatedRecipeResource)
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
    public static TranslatedRecipe createEntity(EntityManager em) {
        TranslatedRecipe translatedRecipe = new TranslatedRecipe()
            .servingSize(DEFAULT_SERVING_SIZE)
            .instructions(DEFAULT_INSTRUCTIONS)
            .language(DEFAULT_LANGUAGE);
        return translatedRecipe;
    }

    @Before
    public void initTest() {
        translatedRecipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createTranslatedRecipe() throws Exception {
        int databaseSizeBeforeCreate = translatedRecipeRepository.findAll().size();

        // Create the TranslatedRecipe
        restTranslatedRecipeMockMvc.perform(post("/api/translated-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedRecipe)))
            .andExpect(status().isCreated());

        // Validate the TranslatedRecipe in the database
        List<TranslatedRecipe> translatedRecipeList = translatedRecipeRepository.findAll();
        assertThat(translatedRecipeList).hasSize(databaseSizeBeforeCreate + 1);
        TranslatedRecipe testTranslatedRecipe = translatedRecipeList.get(translatedRecipeList.size() - 1);
        assertThat(testTranslatedRecipe.getServingSize()).isEqualTo(DEFAULT_SERVING_SIZE);
        assertThat(testTranslatedRecipe.getInstructions()).isEqualTo(DEFAULT_INSTRUCTIONS);
        assertThat(testTranslatedRecipe.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createTranslatedRecipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = translatedRecipeRepository.findAll().size();

        // Create the TranslatedRecipe with an existing ID
        translatedRecipe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranslatedRecipeMockMvc.perform(post("/api/translated-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedRecipe)))
            .andExpect(status().isBadRequest());

        // Validate the TranslatedRecipe in the database
        List<TranslatedRecipe> translatedRecipeList = translatedRecipeRepository.findAll();
        assertThat(translatedRecipeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = translatedRecipeRepository.findAll().size();
        // set the field null
        translatedRecipe.setLanguage(null);

        // Create the TranslatedRecipe, which fails.

        restTranslatedRecipeMockMvc.perform(post("/api/translated-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedRecipe)))
            .andExpect(status().isBadRequest());

        List<TranslatedRecipe> translatedRecipeList = translatedRecipeRepository.findAll();
        assertThat(translatedRecipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTranslatedRecipes() throws Exception {
        // Initialize the database
        translatedRecipeRepository.saveAndFlush(translatedRecipe);

        // Get all the translatedRecipeList
        restTranslatedRecipeMockMvc.perform(get("/api/translated-recipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(translatedRecipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].servingSize").value(hasItem(DEFAULT_SERVING_SIZE)))
            .andExpect(jsonPath("$.[*].instructions").value(hasItem(DEFAULT_INSTRUCTIONS.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getTranslatedRecipe() throws Exception {
        // Initialize the database
        translatedRecipeRepository.saveAndFlush(translatedRecipe);

        // Get the translatedRecipe
        restTranslatedRecipeMockMvc.perform(get("/api/translated-recipes/{id}", translatedRecipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(translatedRecipe.getId().intValue()))
            .andExpect(jsonPath("$.servingSize").value(DEFAULT_SERVING_SIZE))
            .andExpect(jsonPath("$.instructions").value(DEFAULT_INSTRUCTIONS.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTranslatedRecipe() throws Exception {
        // Get the translatedRecipe
        restTranslatedRecipeMockMvc.perform(get("/api/translated-recipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTranslatedRecipe() throws Exception {
        // Initialize the database
        translatedRecipeRepository.saveAndFlush(translatedRecipe);

        int databaseSizeBeforeUpdate = translatedRecipeRepository.findAll().size();

        // Update the translatedRecipe
        TranslatedRecipe updatedTranslatedRecipe = translatedRecipeRepository.findById(translatedRecipe.getId()).get();
        // Disconnect from session so that the updates on updatedTranslatedRecipe are not directly saved in db
        em.detach(updatedTranslatedRecipe);
        updatedTranslatedRecipe
            .servingSize(UPDATED_SERVING_SIZE)
            .instructions(UPDATED_INSTRUCTIONS)
            .language(UPDATED_LANGUAGE);

        restTranslatedRecipeMockMvc.perform(put("/api/translated-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTranslatedRecipe)))
            .andExpect(status().isOk());

        // Validate the TranslatedRecipe in the database
        List<TranslatedRecipe> translatedRecipeList = translatedRecipeRepository.findAll();
        assertThat(translatedRecipeList).hasSize(databaseSizeBeforeUpdate);
        TranslatedRecipe testTranslatedRecipe = translatedRecipeList.get(translatedRecipeList.size() - 1);
        assertThat(testTranslatedRecipe.getServingSize()).isEqualTo(UPDATED_SERVING_SIZE);
        assertThat(testTranslatedRecipe.getInstructions()).isEqualTo(UPDATED_INSTRUCTIONS);
        assertThat(testTranslatedRecipe.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingTranslatedRecipe() throws Exception {
        int databaseSizeBeforeUpdate = translatedRecipeRepository.findAll().size();

        // Create the TranslatedRecipe

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranslatedRecipeMockMvc.perform(put("/api/translated-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(translatedRecipe)))
            .andExpect(status().isBadRequest());

        // Validate the TranslatedRecipe in the database
        List<TranslatedRecipe> translatedRecipeList = translatedRecipeRepository.findAll();
        assertThat(translatedRecipeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTranslatedRecipe() throws Exception {
        // Initialize the database
        translatedRecipeRepository.saveAndFlush(translatedRecipe);

        int databaseSizeBeforeDelete = translatedRecipeRepository.findAll().size();

        // Get the translatedRecipe
        restTranslatedRecipeMockMvc.perform(delete("/api/translated-recipes/{id}", translatedRecipe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TranslatedRecipe> translatedRecipeList = translatedRecipeRepository.findAll();
        assertThat(translatedRecipeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslatedRecipe.class);
        TranslatedRecipe translatedRecipe1 = new TranslatedRecipe();
        translatedRecipe1.setId(1L);
        TranslatedRecipe translatedRecipe2 = new TranslatedRecipe();
        translatedRecipe2.setId(translatedRecipe1.getId());
        assertThat(translatedRecipe1).isEqualTo(translatedRecipe2);
        translatedRecipe2.setId(2L);
        assertThat(translatedRecipe1).isNotEqualTo(translatedRecipe2);
        translatedRecipe1.setId(null);
        assertThat(translatedRecipe1).isNotEqualTo(translatedRecipe2);
    }
}
