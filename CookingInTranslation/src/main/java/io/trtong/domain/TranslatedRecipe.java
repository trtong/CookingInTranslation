package io.trtong.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A TranslatedRecipe.
 */
@Entity
@Table(name = "translated_recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TranslatedRecipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "serving_size")
    private Integer servingSize;

    @Column(name = "name")
    private String name;

    @Column(name = "instructions")
    private String instructions;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @ManyToOne
    @JsonIgnoreProperties("translations")
    private Recipe recipe;

    @OneToMany(mappedBy = "translatedRecipe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TranslatedIngredient> ingredients = new HashSet<>();
    @ManyToMany(mappedBy = "translatedRecipes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<CookBook> translatedRecipes = new HashSet<>();

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

    public TranslatedRecipe servingSize(Integer servingSize) {
        this.servingSize = servingSize;
        return this;
    }

    public void setServingSize(Integer servingSize) {
        this.servingSize = servingSize;
    }

    public String getName() {
        return name;
    }

    public TranslatedRecipe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructions() {
        return instructions;
    }

    public TranslatedRecipe instructions(String instructions) {
        this.instructions = instructions;
        return this;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Language getLanguage() {
        return language;
    }

    public TranslatedRecipe language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public TranslatedRecipe recipe(Recipe recipe) {
        this.recipe = recipe;
        return this;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Set<TranslatedIngredient> getIngredients() {
        return ingredients;
    }

    public TranslatedRecipe ingredients(Set<TranslatedIngredient> translatedIngredients) {
        this.ingredients = translatedIngredients;
        return this;
    }

    public TranslatedRecipe addIngredients(TranslatedIngredient translatedIngredient) {
        this.ingredients.add(translatedIngredient);
        translatedIngredient.setTranslatedRecipe(this);
        return this;
    }

    public TranslatedRecipe removeIngredients(TranslatedIngredient translatedIngredient) {
        this.ingredients.remove(translatedIngredient);
        translatedIngredient.setTranslatedRecipe(null);
        return this;
    }

    public void setIngredients(Set<TranslatedIngredient> translatedIngredients) {
        this.ingredients = translatedIngredients;
    }

    public Set<CookBook> getTranslatedRecipes() {
        return translatedRecipes;
    }

    public TranslatedRecipe translatedRecipes(Set<CookBook> cookBooks) {
        this.translatedRecipes = cookBooks;
        return this;
    }

    public TranslatedRecipe addTranslatedRecipes(CookBook cookBook) {
        this.translatedRecipes.add(cookBook);
        cookBook.getTranslatedRecipes().add(this);
        return this;
    }

    public TranslatedRecipe removeTranslatedRecipes(CookBook cookBook) {
        this.translatedRecipes.remove(cookBook);
        cookBook.getTranslatedRecipes().remove(this);
        return this;
    }

    public void setTranslatedRecipes(Set<CookBook> cookBooks) {
        this.translatedRecipes = cookBooks;
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
        TranslatedRecipe translatedRecipe = (TranslatedRecipe) o;
        if (translatedRecipe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), translatedRecipe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TranslatedRecipe{" +
            "id=" + getId() +
            ", servingSize=" + getServingSize() +
            ", name='" + getName() + "'" +
            ", instructions='" + getInstructions() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
