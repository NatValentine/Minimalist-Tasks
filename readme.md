# Reactive Task Manager (Vanilla JS)

A minimal task management application built with vanilla JavaScript, focused on exploring state-driven UI rendering without relying on frameworks.

## 🚀 Overview

This project demonstrates how to build a reactive interface by managing a centralized application state and deriving the UI from it.

Instead of using libraries like React, the goal was to understand and implement the underlying concepts manually.

## 🧠 Key Concepts

- Centralized state management
- State-driven (derived) UI rendering
- LocalStorage persistence
- Avoiding magic strings through structured state
- Conditional UI rendering
- Perceived performance improvements (FOUC mitigation)

## ⚙️ How it works

- The application maintains a single source of truth (state)
- UI updates are triggered by state changes
- The DOM is re-rendered based on the current state
- Tasks are persisted locally using LocalStorage

## 📦 Features

- Add and remove tasks
- Mark tasks as completed
- Persistent state across sessions
- Dynamic UI updates without frameworks

## 🎯 Purpose

The goal of this project was to deepen my understanding of how modern frontend frameworks work under the hood by recreating similar patterns using plain JavaScript.

## 🔮 Possible Improvements

- Component abstraction
- Editing tasks
- Adding task categories/tags
- Manual ordering of tasks
