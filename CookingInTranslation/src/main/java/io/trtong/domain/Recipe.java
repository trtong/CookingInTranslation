package io.trtong.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.trtong.domain.enumeration.Language;

/**
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "serving_size")
    private Integer servingSize;

    @Column(name = "instructions")
    private String instructions;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "original_language", nullable = false)
    private Language originalLanguage;

    @OneToMany(mappedBy = "recipe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TranslatedRecipe> translations = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recipe_user_details",
               joinColumns = @JoinColumn(name = "recipes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_details_id", referencedColumnName = "id"))
    private Set<UserDetails> userDetails = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recipe_ingredient",
               joinColumns = @JoinColumn(name = "recipes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "ingredients_id", referencedColumnName = "id"))
    private Set<Ingredient> ingredients = new HashSet<>();

    @ManyToMany(mappedBy = "recipes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<CookBook> recipes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getServingSize() {
        return servingSize;
    }

    public Recipe servingSize(Integer servingSize) {
        this.servingSize = servingSize;
        return this;
    }

    public void setServingSize(Integer servingSize) {
        this.servingSize = servingSize;
    }

    public String getInstructions() {
        return instructions;
    }

    public Recipe instructions(String instructions) {
        this.instructions = instructions;
        return this;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Language getOriginalLanguage() {
        return originalLanguage;
    }

    public Recipe originalLanguage(Language originalLanguage) {
        this.originalLanguage = originalLanguage;
        return this;
    }

    public void setOriginalLanguage(Language originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public Set<TranslatedRecipe> getTranslations() {
        return translations;
    }

    public Recipe translations(Set<TranslatedRecipe> translatedRecipes) {
        this.translations = translatedRecipes;
        return this;
    }

    public Recipe addTranslations(TranslatedRecipe translatedRecipe) {
        this.translations.add(translatedRecipe);
        translatedRecipe.setRecipe(this);
        return this;
    }

    public Recipe removeTranslations(TranslatedRecipe translatedRecipe) {
        this.translations.remove(translatedRecipe);
        translatedRecipe.setRecipe(null);
        return this;
    }

    public void setTranslations(Set<TranslatedRecipe> translatedRecipes) {
        this.translations = translatedRecipes;
    }

    public Set<UserDetails> getUserDetails() {
        return userDetails;
    }

    public Recipe userDetails(Set<UserDetails> userDetails) {
        this.userDetails = userDetails;
        return this;
    }

    public Recipe addUserDetails(UserDetails userDetails) {
        this.userDetails.add(userDetails);
        userDetails.getRecipes().add(this);
        return this;
    }

    public Recipe removeUserDetails(UserDetails userDetails) {
        this.userDetails.remove(userDetails);
        userDetails.getRecipes().remove(this);
        return this;
    }

    public void setUserDetails(Set<UserDetails> userDetails) {
        this.userDetails = userDetails;
    }

    public Set<Ingredient> getIngredients() {
        return ingredients;
    }

    public Recipe ingredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
        return this;
    }

    public Recipe addIngredient(Ingredient ingredient) {
        this.ingredients.add(ingredient);
        ingredient.getRecipes().add(this);
        return this;
    }

    public Recipe removeIngredient(Ingredient ingredient) {
        this.ingredients.remove(ingredient);
        ingredient.getRecipes().remove(this);
        return this;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Set<CookBook> getRecipes() {
        return recipes;
    }

    public Recipe recipes(Set<CookBook> cookBooks) {
        this.recipes = cookBooks;
        return this;
    }

    public Recipe addRecipes(CookBook cookBook) {
        this.recipes.add(cookBook);
        cookBook.getRecipes().add(this);
        return this;
    }

    public Recipe removeRecipes(CookBook cookBook) {
        this.recipes.remove(cookBook);
        cookBook.getRecipes().remove(this);
        return this;
    }

    public void setRecipes(Set<CookBook> cookBooks) {
        this.recipes = cookBooks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Recipe recipe = (Recipe) o;
        if (recipe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + getId() +
            ", servingSize=" + getServingSize() +
            ", instructions='" + getInstructions() + "'" +
            ", originalLanguage='" + getOriginalLanguage() + "'" +
            "}";
    }
}
