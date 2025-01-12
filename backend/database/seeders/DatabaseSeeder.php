<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\TechData;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $techData = [
            [ "name" => "HTML"],
            [ "name" => "CSS"],
            [ "name" => "JavaScript"],
            [ "name" => "Sass"],
            [ "name" => "React"],
            [ "name" => "Vue.js"],
            [ "name" => "Redux"],
            [ "name" => "Next.js"],
            [ "name" => "Node.js"],
            [ "name" => "Express.js"],
            [ "name" => "NestJS"],
            [ "name" => "Ruby on Rails"],
            [ "name" => "Django"],
            [ "name" => "Flask"],
            [ "name" => "AWS"],
            [ "name" => "Amazon S3"],
            [ "name" => "Amazon EC2"],
            [ "name" => "Docker"],
            [ "name" => "Kubernetes"],
            [ "name" => "Terraform"],
            [ "name" => "Swift"],
            [ "name" => "UIKit"],
            [ "name" => "Kotlin"],
            [ "name" => "Jetpack Compose"],
            [ "name" => "React Native"],
            [ "name" => "Flutter"],
            [ "name" => "Unity"],
            [ "name" => "C#"],
            [ "name" => "Unreal Engine"],
            [ "name" => "C++"],
            [ "name" => "Godot"],
            [ "name" => "GraphQL"],
            [ "name" => "MongoDB"],
            [ "name" => "PostgreSQL"],
            [ "name" => "SQLite"],
            [ "name" => "Git"],
            [ "name" => "GitHub"],
            [ "name" => "GitLab"],
            [ "name" => "Jenkins"],
            [ "name" => "CircleCI"],
            [ "name" => "Webpack"],
            [ "name" => "Vite"],
            [ "name" => "ESLint"],
            [ "name" => "Prettier"],
            [ "name" => "Three.js"],
            [ "name" => "AR.js"],
            [ "name" => "TensorFlow.js"],
            [ "name" => "PyTorch"],
            [ "name" => "OpenCV"],
            [ "name" => "Rust"],
        ];

        foreach ($techData as $tech) {
            TechData::create($tech);
        }

        $relationships = [
            ["parent_tech_data_id" => 1, "child_tech_data_id" => 2],
            ["parent_tech_data_id" => 1, "child_tech_data_id" => 3],
            ["parent_tech_data_id" => 2, "child_tech_data_id" => 4],
            ["parent_tech_data_id" => 3, "child_tech_data_id" => 5],
            ["parent_tech_data_id" => 3, "child_tech_data_id" => 6],
            ["parent_tech_data_id" => 5, "child_tech_data_id" => 7],
            ["parent_tech_data_id" => 5, "child_tech_data_id" => 8],
            ["parent_tech_data_id" => 9, "child_tech_data_id" => 10],
            ["parent_tech_data_id" => 9, "child_tech_data_id" => 11],
            ["parent_tech_data_id" => 15, "child_tech_data_id" => 16],
            ["parent_tech_data_id" => 15, "child_tech_data_id" => 17],
            ["parent_tech_data_id" => 18, "child_tech_data_id" => 19],
            ["parent_tech_data_id" => 21, "child_tech_data_id" => 22],
            ["parent_tech_data_id" => 23, "child_tech_data_id" => 24],
            ["parent_tech_data_id" => 27, "child_tech_data_id" => 28],
            ["parent_tech_data_id" => 29, "child_tech_data_id" => 30],
        ];

        foreach ($relationships as $relation) {
            TechData::find($relation["parent_tech_data_id"])->children()->attach($relation["child_tech_data_id"]);
        }
    }
}
