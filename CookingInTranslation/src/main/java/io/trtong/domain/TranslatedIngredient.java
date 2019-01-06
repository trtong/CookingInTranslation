package io.trtong.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import io.trtong.domain.enumeration.Language;

/**
 * A TranslatedIngredient.
 */
@Entity
@Table(name = "translated_ingredient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TranslatedIngredient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    @NotNull
    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("ingredients")
    private TranslatedRecipe translatedRecipe;

    @ManyToOne
    @JsonIgnoreProperties("translatedIngredients")
    private Ingredient ingredient;

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

    public TranslatedIngredient name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Language getLanguage() {
        return language;
    }

    public TranslatedIngredient language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Double getAmount() {
        return amount;
    }

    public TranslatedIngredient amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public TranslatedIngredient unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getDescription() {
        return description;
    }

    public TranslatedIngredient description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TranslatedRecipe getTranslatedRecipe() {
        return translatedRecipe;
    }

    public TranslatedIngredient translatedRecipe(TranslatedRecipe translatedRecipe) {
        this.translatedRecipe = translatedRecipe;
        return this;
    }

    public void setTranslatedRecipe(TranslatedRecipe translatedRecipe) {
        this.translatedRecipe = translatedRecipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public TranslatedIngredient ingredient(Ingredient ingredient) {
        this.ingredient = ingredient;
        return this;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
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
        TranslatedIngredient translatedIngredient = (TranslatedIngredient) o;
        if (translatedIngredient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), translatedIngredient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TranslatedIngredient{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", language='" + getLanguage() + "'" +
            ", amount=" + getAmount() +
            ", unit='" + getUnit() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
