package io.trtong.cucumber.stepdefs;

import io.trtong.CookingInTranslationApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = CookingInTranslationApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
