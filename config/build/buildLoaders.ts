import { ModuleOptions } from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshTypescript from 'react-refresh-typescript'

import { BuildOptions } from './types/types'
import { buildBabelLoader } from './babel/buildBabelLoader'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === "development"

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack', 
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                } 
            }
        ],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
            cssLoaderWithModules, 
            "sass-loader"
        ]
    }

    // const tsLoader =  {
    //     // ts-loader вже працює із JSX
    //     // якщо не було б ts потрібно буде налаштовувати babel-loader
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: '/node_modules/'
    // }

    const tsLoader =  {
        exclude: '/node_modules/',
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypescript()].filter(Boolean)
                    })
                }
            }
        ]      
    }

    const babelLoader = buildBabelLoader(options)

    return [
        assetLoader,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgLoader
    ]
}
