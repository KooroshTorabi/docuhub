import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import {
    GrCaretDown as UnfoldMore,
    GrCaretUp as UnfoldLess,
    GrClose as Dismiss,
    GrList as Restore
} from "react-icons/gr";
import { Box, Flex, VStack } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from '@reduxtoolkit/hooks';
import { getTOCOfBodyList } from '@components/Helpers/functions';
enum State {
    Normal,
    Expanded,
    Collapsed,
}

export function TocOfBody({
    Ref,
    postSelector,
    headingSelector,
}: {
    Ref?: any
    postSelector?: string;
    headingSelector?: string;
}) {
    const content = useAppSelector((state: any) => state.body.content);
    postSelector = postSelector || ".e-content.entry-content";
    headingSelector = headingSelector || "h2,h3,h4,h5,h6";
    // const c:HTMLElement= new Body(content);
    // const { headings } = useHeadingsData(Ref, headingSelector);
    const { inViewId } = useInViewId(Ref, headingSelector);
    const heading = getTOCOfBodyList(content);

    const [expansion, setExpansion] = useState(State.Normal);
    const scrollRef = useRef<HTMLDivElement>(null);

    function scroll(to: number) {
        scrollRef.current?.scroll({
            top: to - 75,
            behavior: "smooth",
        });
    }
    const dismissIfExpanded = () => {
        if (expansion === State.Expanded) expand();
    };
    const expand = () => setExpansion(State.Expanded);
    const normal = () => setExpansion(State.Normal);
    const collapse = () => setExpansion(State.Collapsed);

    return (
        <VStack aria-label="Table of Contents"
            className={expansion == State.Collapsed ? "collapsed" : "toc-of-body-all"}
            borderRadius={"15px"}
            py={"15px"}
            zIndex={100}
            bg={"whiteAlpha.800"}
            fontFamily="Ropa Sans"
            position={"fixed"} top={"10vh"} right="35px">
            {expansion != State.Collapsed && (
                <Flex className="controls" w="100%" px="20px" >
                    <Box w="100%" >
                        {expansion == State.Normal ? (
                            <UnfoldMore onClick={expand} size={"20px"} cursor="pointer" />
                        )
                            :
                            (
                                <UnfoldLess onClick={normal} size={"20px"} cursor="pointer" />
                            )}
                    </Box>
                    <Box alignItems={"center"} justifyContent={"right"} cursor="pointer">
                        <Dismiss onClick={collapse} size={"20px"} />

                    </Box>
                </Flex>
            )}
            <Box px="20px"
                w={"100%"}
                ref={scrollRef}
            // className={classNames("", {
            //     expanded: expansion == State.Expanded,
            //     // collapsed: expansion == State.Collapsed,
            //     normal: expansion == State.Normal,
            // })}
            >
                {expansion == State.Collapsed ? (
                    <Box alignItems={"center"} justifyContent={"right"} cursor="pointer" >
                        <Restore onClick={normal} size={"20px"} />
                    </Box>
                ) : (
                        <VStack w={"20vw"}
                            // className="toc-of-body"
                            className={expansion === State.Normal ? "toc-of-body" : "toc-of-body expanded"}
                        >
                        <Box w="100%" role="heading" aria-level={6}>
                            contents:
                        </Box>
                        <Box alignItems="left" w="100%">
                            <ul>
                                    {((expansion !== State.Expanded) && heading.map((o: any) => o.id).indexOf(inViewId) - 1 > 0) &&
                                        (<Box fontSize="18px" pl="15px" color={"gray.900"}>
                                            <li><a className={"inactive"}>{"..."} </a></li></Box>)
                                    }
                                    {
                                        heading.map((h: any, key: any) => {
                                            console.log(key, inViewId, heading.map((o: any) => o.id).indexOf(inViewId));
                                            if (
                                                (expansion === State.Expanded) ||
                                                ((key > heading.map((o: any) => o.id).indexOf(inViewId) - 2) &&
                                                    (key < heading.map((o: any) => o.id).indexOf(inViewId) + 2)))
                                                return (
                                                    <Box key={key} fontSize="18px" pl="15px" color={"gray.900"}>
                                                        <li>
                                                            <H
                                                                entry={{ "text": h.title, id: h.id, level: h.level, items: h.items }}
                                                                inView={inViewId}
                                                                scroll={scroll}
                                                                onClick={dismissIfExpanded}
                                                            />
                                                        </li>
                                                    </Box>
                                                )
                                        }
                                        )
                                    }
                                    {((expansion !== State.Expanded) && heading.map((o: any) => o.id).indexOf(inViewId) + 2 < heading.length) &&
                                        (
                                            <Box key={-1} fontSize="18px" pl="15px" color={"gray.900"}>
                                                <li><a
                                                    // href={`#${}`}
                                                    className={"inactive"}>{"..."} </a></li></Box>)
                                    }
                            </ul>
                        </Box>
                    </VStack>
                )}
            </Box>
        </VStack>
    );
}

function H({
    entry,
    inView,
    scroll,
    onClick,
}: {
    entry: HEntry;
    inView: string | undefined;
    scroll: (to: number) => void;
    onClick: () => void;
}) {
    const aRef = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        if (inView == entry.id && aRef.current) {
            scroll(aRef.current.offsetTop);
        }
    }, [inView]);

    return (
        <>
            <a
                href={`#${entry.id}`}
                // className={classNames("h", entry.id === inView ? "active" : undefined)}
                className={entry.id === inView ? "active" : "inactive"}
                ref={aRef}
                onClick={() => {
                    onClick();
                }}
            >
                {entry.text}
            </a>
            {entry.items && (
                <ul>
                    {entry.items.map((h) => (
                        <li key={h.id}>
                            <H entry={h} inView={inView} scroll={scroll} onClick={onClick} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

function useInViewId(ref: any, headingSelector: string) {
    const [inViewId, setInViewId] = useState<string | undefined>();

    useEffect(() => {
        const inViewSet = new Map<string, HTMLElement>();

        const callback: IntersectionObserverCallback = (changes) => {
            for (const change of changes) {
                change.isIntersecting
                    ? inViewSet.set(change.target.id, change.target as HTMLElement)
                    : inViewSet.delete(change.target.id);
            }

            const inView = Array.from(inViewSet.entries())
                .map(([id, el]) => [id, el.offsetTop] as const)
                .filter(([id, _]) => !!id);

            if (inView.length > 0) {
                setInViewId(
                    inView.reduce((acc, next) => (next[1] < acc[1] ? next : acc))[0]
                );
            }
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: "0px 0px -20% 0px",
        });
        // if (typeof window === 'object') {
        if (typeof ref !== null && typeof ref?.current !== "undefined") {
            for (const el of
                (ref.current as Element).querySelectorAll<Element>(headingSelector)) {
                observer.observe(el);
            }
        }
        return () => observer.disconnect();
    }, [ref]);

    return { inViewId };
}

interface HEntry {
    text: string;
    id: string;
    level: number;
    items?: HEntry[];
}

function getNestedHeadings(headings: readonly HTMLHeadingElement[]): HEntry[] {
    const sentinel: HEntry = { text: "", id: "", level: 0 };
    const traversalStack: HEntry[] = [sentinel];

    for (const h of headings) {
        const hLevel = level(h);
        for (
            let last = traversalStack[traversalStack.length - 1];
            hLevel <= last.level;
            traversalStack.pop(), last = traversalStack[traversalStack.length - 1]
        ) { }

        const last = traversalStack[traversalStack.length - 1];
        last.items = last.items || [];
        last.items.push({
            text: h.textContent || "",
            id: h.id,
            level: hLevel,
        });
        traversalStack.push(last.items[last.items.length - 1]);
    }

    return sentinel.items || [];
}

function level(e: HTMLHeadingElement): number {
    return parseInt(e.tagName[1]);
}

export default TocOfBody;