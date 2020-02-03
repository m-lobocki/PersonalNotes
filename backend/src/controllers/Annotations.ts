import "reflect-metadata";
import {Express} from "express";
import {IRouterMatcher} from "express-serve-static-core";

export const AnnotationMetadataKey = 'controller:annotation';

export type AnnotationMetadata = [(app: Express) => IRouterMatcher<Express>, string];

export function Get(route: string): PropertyDecorator {
    return annotationDecorator([(app: Express) => app.get, route]);
}

export function Post(route: string): PropertyDecorator {
    return annotationDecorator([(app: Express) => app.post, route]);
}

export function Controller(route: string): ClassDecorator {
    return function (constructor: Function): void {
        if (route === '/') {
            route = '';
        }
        Reflect.defineMetadata(AnnotationMetadataKey, route, constructor);
    };
}

function annotationDecorator(metadata: AnnotationMetadata): (target: any, propertyKey: string) => void {
    return function (target: any, propertyKey: string): void {
        Reflect.defineMetadata(AnnotationMetadataKey, metadata, target, propertyKey);
    };
}
