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

/**
 * A CookBook.
 */
@Entity
@Table(name = "cook_book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CookBook implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "recipes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Recipe> recipes = new HashSet<>();
    @OneToMany(mappedBy = "translatedRecipes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TranslatedRecipe> translatedRecipes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("cookbooks")
    private UserDetails userDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CookBook name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public CookBook description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public CookBook recipes(Set<Recipe> recipes) {
        this.recipes = recipes;
        return this;
    }

    public CookBook addRecipes(Recipe recipe) {
        this.recipes.add(recipe);
        recipe.setRecipes(this);
        return this;
    }

    public CookBook removeRecipes(Recipe recipe) {
        this.recipes.remove(recipe);
        recipe.setRecipes(null);
        return this;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }

    public Set<TranslatedRecipe> getTranslatedRecipes() {
        return translatedRecipes;
    }

    public CookBook translatedRecipes(Set<TranslatedRecipe> translatedRecipes) {
        this.translatedRecipes = translatedRecipes;
        return this;
    }

    public CookBook addTranslatedRecipes(TranslatedRecipe translatedRecipe) {
        this.translatedRecipes.add(translatedRecipe);
        translatedRecipe.setTranslatedRecipes(this);
        return this;
    }

    public CookBook removeTranslatedRecipes(TranslatedRecipe translatedRecipe) {
        this.translatedRecipes.remove(translatedRecipe);
        translatedRecipe.setTranslatedRecipes(null);
        return this;
    }

    public void setTranslatedRecipes(Set<TranslatedRecipe> translatedRecipes) {
        this.translatedRecipes = translatedRecipes;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public CookBook userDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
        return this;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
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
        CookBook cookBook = (CookBook) o;
        if (cookBook.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cookBook.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CookBook{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
