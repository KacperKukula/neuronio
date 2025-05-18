"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDto = exports.UpdateUserProfileDto = exports.CreateCourseDto = exports.RegisterDto = exports.LoginDto = void 0;
var Login_dto_1 = require("./dtos/Login.dto");
Object.defineProperty(exports, "LoginDto", { enumerable: true, get: function () { return Login_dto_1.LoginDto; } });
var Register_dto_1 = require("./dtos/Register.dto");
Object.defineProperty(exports, "RegisterDto", { enumerable: true, get: function () { return Register_dto_1.RegisterDto; } });
var CreateCourse_dto_1 = require("./dtos/CreateCourse.dto");
Object.defineProperty(exports, "CreateCourseDto", { enumerable: true, get: function () { return CreateCourse_dto_1.CreateCourseDto; } });
// Users
var UpdateUserProfile_dto_1 = require("./dtos/users/UpdateUserProfile.dto");
Object.defineProperty(exports, "UpdateUserProfileDto", { enumerable: true, get: function () { return UpdateUserProfile_dto_1.UpdateUserProfileDto; } });
// Courses
var Course_dto_1 = require("./dtos/courses/Course.dto");
Object.defineProperty(exports, "CourseDto", { enumerable: true, get: function () { return Course_dto_1.CourseDto; } });
